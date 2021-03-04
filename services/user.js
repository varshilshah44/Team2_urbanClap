const user = require("../models/userModel");

exports.create = (body) => {
    return user.create(body);
}

exports.findUserByEmail = (emailid) => {
    return user.findOne({ userEmail:emailid });
}

exports.getAll = () => {
    return user
    .find({ userRole: { $ne: "admin" } })
    .select("-userPassword -userToken -userTokenExpire -__v");
}

exports.getUserById = (id) => {
    return user
    .findById(id)    
    .select("-userPassword -userToken -userTokenExpire -__v");
}

exports.update = (id,body) => {
    return user.findByIdAndUpdate(id, body, {     
        runValidators: false,
      });
}

exports.remove = (id) => {
    return user.findByIdAndDelete(id); 
}