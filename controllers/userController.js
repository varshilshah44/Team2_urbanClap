const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user = require("../models/userModel");
const service = require("../models/serviceModel");
const appError = require("../utils/appError");

// this is for adding user/vendor details into the collection
exports.signup = async (req, res, next) => {
  try {
    const User = await user.create(req.body);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    return next(new appError(err.message, 500));
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.userEmail || !req.body.userPassword) {    //checking body contains email and password or not
      return next(
        new appError("Please enter the useremail and userpassword", 500)
      );
    }

    const User = await user.findOne({ userEmail: req.body.userEmail }); // verify useremail exist or not
    if (!User) {
      return next(new appError("Please enter the correct useremail", 500));
    }

    const isCompare = await User.comparePassword(     //comparing userpassword with stored_encrypted password
      req.body.userPassword,
      User.userPassword
    );
    if (!isCompare) {
      return next(new appError("Please enter the correct userPassword", 500));
    }

    const token = jwt.sign({ id: User._id }, process.env.JWT_KEY);    //generating token 
    User.userToken = token;                                           //add token and expiretoken details in collection
    User.userTokenExpire = Date.now() + 60 * 60 * 1000;
    await User.save({
      validateBeforeSave: false,
    });

    //checking vendor belong to any service or not
    if (User.userRole === "vendor") {
      const services = await service.find({ vendorId: User._id });
      if (services.length === 0) {
        return res.status(201).json({
          status: "success",
          message: "you do not belong to any service so please enter the service first",
          data: {
            token: token,
            userId: User._id,
          },
        });
      }
    }

    res.status(201).json({
      status: "success",
      data: {
        token: token,
        userId: User._id,
        userRole: User.userRole
      },
    });
  } catch (err) {
    return next(new appError(err.message, 500));
  }
};

//this middleware called before every api request for protection/authorization
exports.permission = async (req, res, next) => {
  if (!req.headers.authorization) {       //checking token is exist in header or not
    return next(new appError("Please provide the token in header", 500));
  }

  const User = await user.findOne({ userToken: req.headers.authorization });      //verify user based on token 
  if (!User) {
    return next(new appError("You are not authorized user", 500));
  }

  if (User.userTokenExpire < Date.now()) {        //checking token expired 
    return next(new appError("You have to login again", 500));
  }

  req.user = User;      //storing logged user detail in req.user

  next();
};

// using access control because adming can see getAllusers and user can not see getAllusers
exports.getUsers = async (req, res, next) => {
  if (req.user.userRole === "admin") {
    if (!req.params.userid) {     //admin can get all users
      const users = await user
        .find({ userRole: { $ne: "admin" } })
        .select("-userPassword -userToken -userTokenExpire -__v");
      res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    } else {
      const User = await user
        .findById(req.params.userid)    //admin cat get user by id
        .select("-userPassword -userToken -userTokenExpire -__v");
      res.status(200).json({
        status: "success",
        data: {
          User,
        },
      });
    }
  } else {      // this else block for user/vendor
    if (req.params.userid) {
      if (req.params.userid == req.user._id) {      //verify that user can only request for his/her details only 
        const User = await user
          .findById(req.params.userid)      //user details by userid
          .select("-userPassword -userToken -userTokenExpire -__v");
        res.status(200).json({
          status: "success",
          data: {
            User,
          },
        });
      } else {
        return next(new appError("you are not logged in", 500));
      }
    } else {
      return next(new appError("you are not admin", 500));
    }
  }
};

exports.updateUser = async (req, res, next) => {
  if (!req.params.userid) {
    return next(new appError("Please provide the userId", 500));
  }
  if (req.params.userid == req.user._id) {    //verify that user can only update his/her details only 
    const bodyArr = ["userName", "userMobile", "userAddress", "isActive"];    //user can only update from this fields
    for (let i of Object.keys(req.body)) {      //excluding other fields from req.body
      if (!bodyArr.includes(i)) {
        delete req.body[i];
      }
    }
    try {
      req.body.updatedAt = Date.now();
      await user.findByIdAndUpdate(req.params.userid, req.body, {     //update user by id
        runValidators: false,
      });

      res.status(201).json({
        status: "success",
      });
    } catch (err) {
      return next(new appError(err.message, 500));
    }
  } else {
    return next(new appError("you are not logged in", 500));
  }
};


// delete the user/vendor accoung and also remove the vendorId from services
exports.deleteUser = async (req, res, next) => {
  if (!req.params.userid) {
    return next(new appError("Please provide the userId", 500));
  }
  if (req.params.userid == req.user._id) {      //verify that user can only delete for his/her account only 
    try {
      if (req.user.userRole === "vendor") {     // checking user is vendor or not  
        const services = await service.find({ vendorId: req.user._id });    //finding services provided by this vendor
        services.forEach(async (item) => {
          await service.findByIdAndUpdate(      //pop vendorid from services
            item._id,
            { $pull: { vendorId: req.user._id } },
            { new: true, runValidators: false }
          );
        });
      }
      await user.findByIdAndDelete(req.params.userid);    //for delete the user/vendor account 
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      return next(new appError(err.message, 500));
    }
  }
};


//vendor choose service in which he/she will work
exports.addVendorIntoService = async (req, res, next) => {
  if (!req.params.serviceid) {
    return next(new appError("Please provide the serviceId", 500));
  }
  if (req.user.userRole === "vendor") {
    await service.findByIdAndUpdate(      //adding vendorid into service 
      req.params.serviceid,
      { $push: { vendorId: req.user._id } },
      {
        new: true,
        runValidators: false,
      }
    );

    res.status(200).json({
      status: "success",
    });
  } else {
    return next(new appError("You are not vendor", 500));
  }
};
