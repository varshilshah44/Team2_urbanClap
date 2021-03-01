const category = require('../models/categoryModel');
const User = require('../models/userModel');
const service = require('../models/serviceModel');
const {deleteUser} = require('./userController')

exports.createService = async (req, res, next) => {
    try {
        req.body.categoryId = req.params.categoryId;
        if(! await category.findById(req.params.categoryId)){
            throw new Error("category does not exist");
        }
        const data = await service.create(req.body);
        res.status(200).json({
            status: 'Success'
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
        req.body.updatedAt = Date.now();
        // Will throw error if user tries to update vendor id of a service using this route
        if(req.body.vendorId) throw new Error('Use the given route to update vendor Id in a service')
        const data = await service.findByIdAndUpdate(req.params.serviceId, req.body,{
            new: true,
            runValidators: true
        })
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

exports.getAllService = async (req, res, next) => {     // For Users to select the services
    try {
        const data =    // For getting all vendors for that selected service
        await service.find({ categoryId: req.params.categoryId }, 'serviceName servicePrice serviceDescription serviceTime vendorId')
        .select('-_id').populate('vendorId', 'userName -_id');
        console.log(data);
        if(data.length === 0) throw new Error('Either the service or category does not exist');
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

exports.deleteService = async (req,res,next)=>{
    try {        
        const data = await service.findByIdAndDelete(req.params.serviceId);
        if(!data) throw new Error('The Service does not exist');
        console.log(data);
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