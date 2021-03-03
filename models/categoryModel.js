const mongoose = require('../dbconnection');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        validate: [/^[A-Za-z]/, 'Name should contain only letters'],
        required: [true, 'Category Name is required']
    }
}, { collection: 'category' })

const category = mongoose.model('category', categorySchema);

module.exports = category;
