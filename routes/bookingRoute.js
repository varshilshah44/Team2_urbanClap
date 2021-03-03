const bookingController = require("../controllers/bookingController");
const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/", userController.permission, bookingController.addBooking);
router.put(
  "/:bookingid",
  userController.permission,
  bookingController.updateBooking
);
router.get(
  "/:userid?/:bookingstatus?",
  userController.permission,
  bookingController.getBookings
);
module.exports = router;
