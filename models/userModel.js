const mongoose = require("../dbconnection");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'userName must be required'],
        validate:[/^[a-zA-Z\s]+$/,'userName only contains alphabets and spaces']
    },
    userEmail:{
        type:String,
        required:[true,'userEmail must be required'],
        validate:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'userEmail must be valid'],
        unique:true
    },
    userPassword:{
        type:String,
        required:[true,'password must be required']
    },
    userConfirmPassword:{
        type:String,
        required:[true,'confirmPassword must be required'],
        validate:{
            validator:function(val){
                return val===this.userPassword;
            },
            message:'confirmPassword and password are different'
        }
    },
    userMobile:{
        type:String,
        required:[true,'userMobile must be required'],
        validate:[/^(\+\d{1,3}[- ]?)?\d{10}$/,'userMobile is not valid'],
        unique:true
    },
    userAddress:{
        type:String,
        required:[true,'userAddress must be required']
    },
    userRole:{
        type:String,
        lowercase:true,
        required:[true,'userRole must be required'],
        enum:['user','vendor']
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:Date
}, { collection: "user" });

const user = mongoose.model("user", userSchema);
module.exports = user;
