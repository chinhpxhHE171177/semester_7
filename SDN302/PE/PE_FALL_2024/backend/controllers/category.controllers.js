// controllers/category.controllers.js
const Category = require('../models/category');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateCategory = [
    body('categoryName')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),
    body('categoryDescription')
        .optional()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
];

// Get all categories
exports.getAlls = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// C1: Create category 
exports.createCategory = [
    validateCategory, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }

            const category = new Category({
                categoryName: req.body.categoryName,
                categoryDescription: req.body.categoryDescription
            });

            const savedCategory = await category.save();
            return res.status(201).json(savedCategory);
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'Category name must be unique' });
            } else {
                return res.status(500).json({ message: error.message });
            }
        }
    }
];

// Get category by ID
exports.getByID = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Update category
exports.updateCategory = [

    validateCategory, async (req, res) => {
        try {
            const { id } = req.params;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }

            const category = await Category.findByIdAndUpdate(id, {
                categoryName: req.body.categoryName,
                categoryDescription: req.body.categoryDescription
            }, { new: true, runValidators: true });

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'Category name must be unique' });
            } else {
                return res.status(500).json({ message: error.message });
            }
        }
    }
];

// Delete category 
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
