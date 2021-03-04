const {create,update,getAll,remove} = require('../services/category');

exports.addCategory = async (req, res, next) => {
    try {
        const data = await create(req.body);
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
        const data = await update(req.params.id, req.body)
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
        const data = await getAll();
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

exports.deleteCategory = async (req, res, next) => {
    try {        
        const data = await remove(req.params.id);
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