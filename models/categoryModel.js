const mongoose = require('../dbconnection');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        validate: [/[A-Za-z]/, 'Name should contain only letters'],
        required: [true, 'Category Name is required']
    }
}, { collection: 'category' })

exports.category = mongoose.model('category', categorySchema);