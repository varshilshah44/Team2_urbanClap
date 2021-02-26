const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.put('/service/:serviceid',userController.permission,userController.addVendorIntoService)

module.exports = router;