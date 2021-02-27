const booking = require("../models/bookingModel");
const appError = require("../utils/appError");

// add booking details into booking collection
exports.addBooking = async (req, res, next) => {
  try {
    await booking.create(req.body);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    return next(new appError(err.message, 500));
  }
};

// update booking details
exports.updateBooking = async (req, res, next) => {
  if (!req.params.bookingid) {
    return next(new appError("Please provide the bookingid", 500));
  }
  const updateArr = [                   //user can only update this fields only
    "bookingDate",
    "bookingTime",
    "qty",
    "bookingStatus",
    "isCanceledBy",
  ];
  for (let i of Object.keys(req.body)) {        //removing extra fields from req.body
    if (!updateArr.includes(i)) {
      delete req.body[i];
    }
  }
  req.body.updatedAt = Date.now();
  try {
    const Booking = await booking.findByIdAndUpdate(        //updation
      req.params.bookingid,
      req.body,
      { new: true, runValidators: false }
    );
  } catch (err) {
    return next(new appError(err.message, 500));
  }
};

// adming can see all bookings and can see booking based on userid and also can see with bookingstatus
exports.getBookings = async (req, res, next) => {
  if (req.user.userRole === "admin") {          // checking logged user is admin or not
    if (req.params.userid && req.params.bookingstatus) {    // if userid and bookingstatus both in params
      const obj = {
        userId: req.params.userid,
        bookingStatus: req.params.bookingstatus,
      };
      const Bookings = await getBookingByuserIdAndbookingStatus(obj);       
      res.status(200).json({
        status: "success",
        Bookings,
      });
    } else if (!req.params.userid && !req.params.bookingstatus) {       //if nothing in params then getAllBookngs
      const Bookings = await getBookingByuserIdAndbookingStatus({});
      res.status(200).json({
        status: "success",
        Bookings,
      });
    } else if (req.params.userid && !req.params.bookingstatus) {            //if only userId in params then getAllbookings based on userid
      const obj = {
        userId: req.params.userid,
      };
      const Bookings = await getBookingByuserIdAndbookingStatus(obj);
      res.status(200).json({
        status: "success",
        Bookings,
      });
    }       
  } else {                  // this else block for user/vendor
    if (req.params.userid == req.user._id) {            // verfiy logged user request for his/her booking or not
      if (req.params.userid && req.params.bookingstatus) {      //if userid and bookingstatus both in params
        const obj = {
          userId: req.params.userid,
          bookingStatus: req.params.bookingstatus,
        };
        const Bookings = await getBookingByuserIdAndbookingStatus(obj);
        res.status(200).json({
          status: "success",
          Bookings,
        });
      } else if (req.params.userid && !req.params.bookingstatus) {    //if only userid in parameter
        const obj = {
          userId: req.params.userid,
        };
        const Bookings = await getBookingByuserIdAndbookingStatus(obj);
        res.status(200).json({
          status: "success",
          Bookings,
        });
      }
    } else {
      return next(new appError("You are not logged in", 500));
    }
  }
};


// this is for remove redundency 
function getBookingByuserIdAndbookingStatus(obj) {
  return booking
    .find(obj)
    .populate({
      path: "userId",
      select: "userName userMobile userEmail userAddress",
    })
    .populate({
      path: "serviceId",
      select: "serviceName servicePrice serviceTime",
    })
    .populate({
      path: "vendorId",
      select: "userName userMobile userEmail userAddress",
    });
}
