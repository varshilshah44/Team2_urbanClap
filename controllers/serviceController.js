const { create, checkCategory, update, getAll, getVendors, remove } = require('../services/service');

exports.createService = async (req, res, next) => {
    try {
        req.body.categoryId = req.params.categoryId;
        if (! await checkCategory(req.params.categoryId)) {
            throw new Error("category does not exist")
        }
        const data = await create(req.body);
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
                message: err
            });
        }
    }
};

exports.updateService = async (req, res, next) => {
    try {
        req.body.updatedAt = Date.now();
        // Will throw error if user tries to update vendor id of a service using this route
        if (req.body.vendorId) throw new Error('Use the given route to update vendor Id in a service')
        const data = await update(req.params.serviceId, req.body)
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
            await getAll(req.params.categoryId)
        if (data.length === 0) throw new Error('Either the service or category does not exist');
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
        const data =
            await getVendors(req.params.serviceId)
        res.status(200).json({
            status: 'Success',
            vendors: data.vendorId
        })
        next();
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const data = await remove(req.params.serviceId);
        if (!data) throw new Error('The Service does not exist');
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