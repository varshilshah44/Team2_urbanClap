const mongoose = require('../dbconnection');
const {defaultSchema} = require('../common/defaultSchema')
const serviceSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'category'
        // ,required: true
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
}, { collection: 'service' })

serviceSchema.plugin(defaultSchema)
const service = mongoose.model('service', serviceSchema);
module.exports = service;
