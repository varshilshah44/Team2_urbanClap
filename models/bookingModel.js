const mongoose = require('../dbconnection');
const {defaultSchema} = require('../common/defaultSchema')

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
        required:[true,'bookingTime is required'],
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
        enum:['pending','accepted','inprogress','cancelled','completed'],
        default:'pending'
    },
    isCanceledBy:{
        type:String,
        enum:['user','vendor']
    },
},{collection:'booking'})

bookingSchema.plugin(defaultSchema)
const booking = mongoose.model('booking',bookingSchema);
module.exports = booking;