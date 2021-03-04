const jwt = require("jsonwebtoken");

exports.tokenGenerate = (userid) => {
    return jwt.sign({ id:userid }, process.env.JWT_KEY);
}