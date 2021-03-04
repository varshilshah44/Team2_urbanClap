const { Router } = require('express');
const express = require('express');

const router = express.Router();

const {createService,getAllService,updateService,deleteService,getVendors} = require('../controllers/serviceController');
const {checkAdmin} = require("../middleware/checkAdmin");
const {permission} = require("../middleware/auth");

router.route('/:categoryId')
    .post(permission,checkAdmin,createService)
    .get(permission,getAllService);      // For Users to select the services
router.route('/:serviceId')
    .put(permission,checkAdmin,updateService)        //TODO
    .delete(permission,checkAdmin,deleteService);    //TODO
router.route('/vendor/:serviceId')
    .get(permission,getVendors)


module.exports = router;
