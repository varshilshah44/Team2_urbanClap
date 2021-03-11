var express = require("express");
var router = express.Router();
const category = require("../services/category");
const service = require("../services/service");
const user = require("../services/user");
const booking = require("../services/booking");

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/admindashboard", function (req, res, next) {
  res.render("admin", { data: {} });
});

router.get("/categories", async function (req, res, next) {
  const data = await category.getAll();
  res.render("admin", {
    data: {
      categories: data,
    },
  });
});

router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

router.get("/services", async function (req, res, next) {
  const data = await service.getAll(req.query.id);
  res.render("admin", {
    data: {
      services: data,
      categoryid: req.query.id,
    },
  });
});

router.get("/vendors", async function (req, res, next) {
  const data = await service.getVendors(req.query.id);
  res.render("admin", {
    data: {
      vendors: data.vendorId,
    },
  });
});

router.get("/users", async function (req, res, next) {
  const data = await user.getAll();
  res.render("admin", {
    data: {
      users: data,
    },
  });
});

router.get("/bookings", async function (req, res, next) {
  let data;
  let user;
  if (!req.query.userid) {
    if (req.query.status) {
      data = await booking.getBookingByuserIdAndbookingStatus({
        bookingStatus: req.query.status,
      });
    } else {
      data = await booking.getBookingByuserIdAndbookingStatus({});
    }
  } else {
    if (req.query.status) {
      data = await booking.getBookingByuserIdAndbookingStatus({
        bookingStatus: req.query.status,
        userId:req.query.userid
      });
    } else {
      data = await booking.getBookingByuserIdAndbookingStatus({
        userId: req.query.userid,
      });
    }
    user = req.query.userid;
  }
  res.render("admin", {
    data: {
      bookings: data,
      user: user,
    },
  });
});

router.get("/profile", async function (req, res, next) {
  const data = await user.getUserById(req.query.userid);
  console.log(data);
  res.render("admin", {
    data: {
      profile: data,
    },
  });
});

router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

module.exports = router;
