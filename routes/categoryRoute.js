const express = require('express');
const router = express.Router();

const {addCategory,updateCategory,deleteCategory,getAllCategory} = require('../controllers/categoryController');
const {permission} = require("../middleware/auth");
const {checkAdmin} = require("../middleware/checkAdmin");


router.route('/')
    .post(permission,checkAdmin, addCategory)
    .get(permission,getAllCategory);
router.route('/:id')
    .put(permission,checkAdmin,updateCategory)
    .delete(permission,checkAdmin,deleteCategory);

module.exports = router;
