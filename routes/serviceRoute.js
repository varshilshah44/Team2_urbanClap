const { Router } = require('express');
const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/serviceController');
const { checkAdmin } = require('../controllers/categoryController');
const { permission } = require('../controllers/userController')

router.route('/:categoryId')
    .post(checkAdmin, serviceController.createService)
    .get(serviceController.getAllService);      // For Users to select the services
router.route('/:serviceId')
    .put(checkAdmin)        //TODO
    .delete(checkAdmin);    //TODO
router.route('/vendor/:serviceId')
    .get(serviceController.getVendors)


module.exports = router;
