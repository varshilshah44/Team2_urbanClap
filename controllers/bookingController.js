const booking = require('../models/bookingModel');
const appError = require('../utils/appError');
exports.addBooking =  async (req,res,next) => {
    try{
        await booking.create(req.body);
        res.status(201).json({
            status:'success'
        })
    }
    catch(err){
        return next(new appError(err.message,500));
    } 
}

exports.updateBooking = async (req,res,next) => {
        
}