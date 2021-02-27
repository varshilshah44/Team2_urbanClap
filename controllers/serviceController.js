const category = require('../models/categoryModel');
const User = require('../models/userModel');
const service = require('../models/serviceModel');

exports.createService = async (req, res, next) => {
    try {
        req.body.categoryId = req.params.categoryId;
        const data = await service.create(req.body);
        res.status(200).json({
            status: 'Success',
            data: data
        })
        next()
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                status: 'Failed',
                message: 'The service already exist'
            });
        } else {
            res.status(400).json({
                status: 'Failed',
                message: err.message
            });
        }
    }
};

exports.updateService = async (req, res, next) => {
    try {
        const data = await service.findByIdAndUpdate(req.params.serviceId,)
        next();
    } catch (err) {

    }
};

exports.getAllService = async (req, res, next) => {     // For Users to select the services
    try {
        const data =    // For getting all vendors for that selected service
            await service.find({ categoryId: req.params.categoryId }, 'serviceName servicePrice serviceDescription serviceTime vendorId')
                .select('-_id').populate('vendorId', 'userName -_id');
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

exports.getVendors = async (req, res, next) => {
    try {
        console.log("VENDOR!!")
        const data =
            await service.findById(req.params.serviceId, 'vendorId')
                .select('-_id').populate('vendorId', 'userName -_id');
        res.status(200).json({
            status: 'Success',
            data
        })
        next();
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};