const category = require('../models/categoryModel');
const service = require('../models/serviceModel');

exports.create = (body) => {
    return category.create(body);
}

exports.update = (id,body) => {
    return category.findByIdAndUpdate(id,body, {
        new: true,
        runValidators: true
    }).select('-_id -__v');
}

exports.getAll = ()=>{
    return category.find({}).select('-__v');
}

exports.remove = (id)=>{
    const services = service.deleteMany({categoryId: id})
    return category.findByIdAndDelete(id);
     
}