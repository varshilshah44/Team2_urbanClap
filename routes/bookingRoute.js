const {updateBooking,getBookings,addBooking} = require("../controllers/bookingController");
const {permission} = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/", permission,addBooking);
router.put(
  "/:bookingid",
  permission,
  updateBooking
);
router.get(
  "/:userid?/:bookingstatus?",
  permission,
  getBookings
);
module.exports = router;
