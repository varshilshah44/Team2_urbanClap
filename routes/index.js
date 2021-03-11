var express = require('express');
var router = express.Router();
// const axios = require('axios');
const { getAll } = require('../services/category')
const serv = require('../services/service')
const user = require('../services/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { admin: false });
});

router.get('/admin', (req, res, next) => {
  res.render('admin', { admin: true })
})

router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', {
    admin: false
  })
})

router.get('/adminDashboard', async (req, res, next) => {
  res.render('dashboard', {
    admin: true
    // cat: [data.categoryName],
    // service: [service],
    // users: [allUser]
  }
  )
})

module.exports = router;
