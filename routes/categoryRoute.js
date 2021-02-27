const { Router } = require('express');
const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/categoryController');
const {permission} = require('../controllers/userController')

router.route('/').post(categoryController.checkAdmin, categoryController.addCategory).get(categoryController.getAllCategory);
router.route('/:id').put(categoryController.checkAdmin, categoryController.updateCategory).delete(categoryController.checkAdmin, categoryController.delete);

module.exports = router;
