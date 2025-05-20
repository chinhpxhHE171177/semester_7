// routes/category.routes.js
const express = require('express');
const { authenticateJWT } = require('../middleware/authMiddleware');
const {
    getAlls,
    createCategory,
    getByID,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controllers');

const router = express.Router();

//GET: / Get all categories
router.get('/', getAlls);
//POST: /create Create a new category
router.post('/create', authenticateJWT, createCategory);
//GET: /:id Get Category by id
router.get('/:id', getByID);
//PUT: /:id/update Update category
router.put('/:id/update', authenticateJWT, updateCategory);
//DELETE: /:id/delete Delete category
router.delete('/:id/delete', authenticateJWT, deleteCategory);

module.exports = router;
