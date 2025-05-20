// controllers/productController.js
const Product = require('../models/product');
const Category = require('../models/category');

// 🔎 Lấy tất cả sản phẩm, populate thông tin category
exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category', 'name description'); // 🏷️ Chỉ lấy name & description

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Formatting data
        const newProducts = products?.map(p => {
            return {
                id: p._id,
                pName: p.name,
                pPrice: p.price,
                pStock: p.stock,
                category: {
                    cName: p.category.name,
                    cDescription: p.category.description
                }
            };
        });

        // res.status(200).json(products);
        res.status(200).json(newProducts);
    } catch (error) {
        next(error);
    }
};

// ➕ Thêm sản phẩm mới với kiểm tra category
exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, stock, category } = req.body;

        // Validation cơ bản
        if (!name || !price || !stock || !category) {
            return res.status(400).json({ message: 'All fields (name, price, stock, category) are required' });
        }

        // ⚡ Kiểm tra xem category có tồn tại không
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const newProduct = new Product({ name, price, stock, category });
        const savedProduct = await newProduct.save();

        // 🏷️ Populate category sau khi lưu
        const populatedProduct = await savedProduct.populate('category', 'name description');
        res.status(201).json(populatedProduct);
    } catch (error) {
        next(error);
    }
};
