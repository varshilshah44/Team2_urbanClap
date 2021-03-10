var express = require('express');
var router = express.Router();
const category = require('../services/category');
const service = require('../services/service');
const user = require('../services/user');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/admindashboard", function (req, res, next) {
  res.render("admin",{data:{}});
});

router.get("/categories", async function (req, res, next) {
  const data = await category.getAll();
  res.render("admin",{data:{
    categories:data
  }});
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/services', async function(req, res, next) {
  const data = await service.getAll(req.query.id);
  res.render('admin',{data:{
    services:data,
    categoryid:req.query.id
  }});
});

router.get('/vendors', async function(req, res, next) {
  const data = await service.getVendors(req.query.id);
  res.render('admin',{data:{
    vendors:data.vendorId,
  }});
});

router.get('/users', async function(req, res, next) {
  const data = await user.getAll();
  res.render('admin',{data:{
    users:data,
  }});
});


router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
