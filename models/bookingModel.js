const mongoose = require('../dbconnection');

const bookingSchema = new mongoose.Schema({
    serviceId:{
        type:mongoose.Schema.ObjectId,
        ref:'service',
        required:[true,'serviceId is required']
    },
    vendorId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:[true,'vendorId is required']
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:[true,'userId is required']   
    },
    bookingDate:{
        type:Date,
        required:[true,'bookingDate is required']
    },
    bookingTime:{
        type:String,
        required:[true,'bookingDate is required'],
        validate:[/(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)(am|pm)/,'bookingTime must be valid']
    },
    qty:{
        type:Number,
        required:[true,'qty is required'],
        validate:[/^[1-9]\d*$/,'qty must be valid']
    },
    totalPrice:{
        type:Number,
        required:[true,'totalPrice is required'],
        validate:[/^[1-9]\d*$/,'totalPrice must be valid']
    },
    bookingStatus:{
        type:String,
        lowercase:true,
        enum:['pending','accepted','inprogress','rejected','completed'],
        default:'pending'
    },
    isCanceledBy:{
        type:String,
        enum:['user','vendor']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
    },
},{collection:'booking'})

const booking = mongoose.model('booking',bookingSchema);
module.exports = booking;