const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user = require("../models/userModel");
const service = require("../models/serviceModel");
const appError = require("../utils/appError");
const { ObjectID } = require("bson");

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
    if (!req.body.userEmail || !req.body.userPassword) {
      return next(
        new appError("Please enter the useremail and userpassword", 500)
      );
    }

    const User = await user.findOne({ userEmail: req.body.userEmail });
    if (!User) {
      return next(new appError("Please enter the correct useremail", 500));
    }

    const isCompare = await User.comparePassword(
      req.body.userPassword,
      User.userPassword
    );
    if (!isCompare) {
      return next(new appError("Please enter the correct userPassword", 500));
    }

    const token = jwt.sign({ id: User._id }, process.env.JWT_KEY);
    User.userToken = token;
    User.userTokenExpire = Date.now() + 30 * 60 * 60 * 1000;
    await User.save({
      validateBeforeSave: false,
    });

    res.status(201).json({
      status: "success",
      data: {
        token: token,
        userId: User._id,
      },
    });
  } catch (err) {
    return next(new appError(err.message, 500));
  }
};

exports.permission = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new appError("Please provide the token in header", 500));
  }

  const User = await user.findOne({ userToken: req.headers.authorization });
  if (!User) {
    return next(new appError("You are not authorized user", 500));
  }

  if (User.userTokenExpire < Date.now()) {
    return next(new appError("You have to login again", 500));
  }

  req.user = User;

  next();
};

exports.getUsers = async (req, res, next) => {
  if (req.user.userRole === "admin") {
    if (!req.params.userid) {
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
        .findById(req.params.userid)
        .select("-userPassword -userToken -userTokenExpire -__v");
      res.status(200).json({
        status: "success",
        data: {
          User,
        },
      });
    }
  } else {
    if (req.params.userid) {
      if (req.params.userid == req.user._id) {
        const User = await user
          .findById(req.params.userid)
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
  if (req.params.userid == req.user._id) {
    const bodyArr = ["userName", "userMobile", "userAddress", "isActive"];
    for (let i of Object.keys(req.body)) {
      if (!bodyArr.includes(i)) {
        delete req.body[i];
      }
    }
    try {
      req.body.updatedAt = Date.now();
      await user.findByIdAndUpdate(req.params.userid, req.body, {
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

exports.deleteUser = async (req, res, next) => {
  if (!req.params.userid) {
    return next(new appError("Please provide the userId", 500));
  }
  if (req.params.userid == req.user._id) {
    try {
      if (req.user.userRole === "vendor") {
        const services = await service.find({ vendorId: req.user._id });
        services.forEach(async (item) => {
          await service.findByIdAndUpdate(
            item._id,
            { $pull: { vendorId: req.user._id } },
            { new: true, runValidators: false }
          );
        });
      }
      await user.findByIdAndDelete(req.params.userid);
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      return next(new appError(err.message, 500));
    }
  }
};

exports.addVendorIntoService = async (req, res, next) => {
  if (!req.params.serviceid) {
    return next(new appError("Please provide the serviceId", 500));
  }
  if (req.user.userRole === "vendor") {
    await service.findByIdAndUpdate(
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
