const {signup,getUsers,login,updateUser,deleteUser,addVendorIntoService} = require('../controllers/userController');
const {permission} = require("../middleware/auth");

const express = require('express');
const router = express.Router();

router.post('/signup',signup);
router.put('/login',login);
router.get('/:userid?',permission,getUsers);
router.put('/:userid',permission,updateUser);
router.delete('/:userid',permission,deleteUser);
router.put('/service/:serviceid',permission,addVendorIntoService);
module.exports = router;