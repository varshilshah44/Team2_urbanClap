const booking = require("../models/bookingModel");

exports.create = (body) => {
    return  booking.create(body);
}

exports.update = (id,body) => {
   return booking.findByIdAndUpdate(        //updation
        id,
        body,
        { new: true, runValidators: false }
      );
}

exports.getBookingByuserIdAndbookingStatus = (obj) => {
    return booking
      .find(obj)
      .populate({
        path: "userId",
        select: "-_id userName userMobile userEmail userAddress",
      })
      .populate({
        path: "serviceId",
        select: "-_id serviceName servicePrice serviceTime",
      })
      .populate({
        path: "vendorId",
        select: "-_id userName userMobile userEmail userAddress",
      });
  }