const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/signup',userController.signup);
router.put('/login',userController.login);
router.get('/:userid?',userController.permission,userController.getUsers);
router.put('/:userid',userController.permission,userController.updateUser);
router.delete('/:userid',userController.permission,userController.deleteUser);
router.put('/service/:serviceid',userController.permission,userController.addVendorIntoService);
module.exports = router;