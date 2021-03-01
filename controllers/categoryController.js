const category = require('../models/categoryModel');
const User = require('../models/userModel');
const service = require('../models/serviceModel');

exports.checkAdmin = async (req,res,next)=>{        // This is ran before all other category routes as only admin has access to this rout
    try {        
        const user = await User.findOne({ userToken: req.headers.authorization});
        if(user.userRole !== 'admin') throw new Error('Only Admin can access this page!');
        next();
    } catch (err) {
        res.status(401).json({
            status: 'Unauthorized',
            message: err.message
        });
    }
};

exports.addCategory = async (req, res, next) => {
    try {
        const data = await category.create(req.body);
        res.status(200).json({
            status: 'Success'
        })
        next();
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                status: 'Failed',
                message: 'The category already exist'
            });
        } else {
            res.status(400).json({
                status: 'Failed',
                message: err.message
            });
        }
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const data = await category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-_id -__v');
        res.status(200).json({
            status: 'Success'
        })
        next();
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                status: 'Failed',
                message: 'The category already exist'
            });
        } else {
            res.status(400).json({
                status: 'Failed',
                message: err.message
            });
        }
    }
};

exports.getAllCategory = async (req, res, next) => {
    try {
        const data = await category.find({}).select('-_id -__v');
        res.status(200).json({
            status: 'Success',
            data: data
        })
        next();
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const services = await service.deleteMany({categoryId: req.params.id})
        const data = await category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Success'
        })
        next();
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};