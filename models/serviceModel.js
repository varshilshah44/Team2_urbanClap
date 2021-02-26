const mongoose = require('../dbconnection');

const serviceSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'category',
        required: true
    },
    serviceName: {
        type: String,
        required: true,
        unique: true
    },
    servicePrice: {
        type: Number,
        validate: [/^[1-9]\d*$/, 'Please enter valid price'],
        required: [true, 'Price is required']
    },
    serviceDescription: {
        type: String        // If required use min max length
    },
    serviceTime: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    vendorId: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date
}, { collection: 'service' })

const service = mongoose.model('service', serviceSchema);
module.exports = service;
/**
 * 2) services

- categoryId :
- serviceName : "Ac Re..",
- servicePrice : 20
- serviceDescription :
####- serviceTime:######
####- active: Boolean######
- vendorId : array of vendorIds who provide this service , vendorId means userId
 */