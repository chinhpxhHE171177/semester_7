// routes/categoryRoutes.js
const express = require('express');
const { getAllCategory, addCategory, updateCategoryById, getCategoryById, deleteCategoryById } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET: / Get all categories route 
router.get('/', getAllCategory);
// POST: /create Create a new Category 
router.post('/create', authMiddleware, addCategory);
// PUT: /update Update a category
router.put('/update/:categoryId', authMiddleware, updateCategoryById);
// GET: /categoryId Get A Category By Id
router.get('/:categoryId', getCategoryById);
// DELETE: /categoryId Delete a category by id
router.delete('/:categoryId', authMiddleware, deleteCategoryById);

module.exports = router;