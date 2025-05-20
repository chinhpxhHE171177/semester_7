// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        maxLength: [50, 'Category name cannot exceed 50 characters'],
        unique: true
    },
    description: {
        type: String,
        trim: true,
        maxLength: [255, 'Description cannot exceed 255 characters']
    }
});

// Tăng hiệu suất tìm kiếm theo name
categorySchema.index({ name: 1 });

module.exports = mongoose.model("Category", categorySchema);

