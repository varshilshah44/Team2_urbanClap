const user = require("../models/userModel");
const appError = require("../utils/appError");
var createError = require('http-errors');

//this middleware called before every api request for protection/authorization
exports.permission = async (req, res, next) => {
    if (!req.headers.authorization) {       //checking token is exist in header or not
      return next(createError(500,'Please provide the token in headers'));
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