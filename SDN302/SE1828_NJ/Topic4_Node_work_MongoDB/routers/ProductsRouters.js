// ProductsRoutes.js
// const express = require('express');
// const ProductsRouter = express.Router();
// const { MongoClient } = require('mongodb');

// const mongodb_url = "mongodb://127.0.0.1:27017";
// const dbName = "SDN1828";

// ProductsRouter.get('/', async (req, res) => {
//     try {
//         const connection = await MongoClient.connect(mongodb_url);
//         const db = connection.db(dbName);
//         const products = await db.collection('products').find().toArray();
//         res.status(200).json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });



// module.exports = ProductsRouter;


const express = require('express');
const { ObjectId } = require('mongodb');
const ProductsRouter = express.Router();

// 📜 Lấy danh sách sản phẩm (READ)
ProductsRouter.get('/list', async (req, res) => {
    try {
        const products = await req.db.collection('products').find().toArray();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 📝 Tạo sản phẩm mới (CREATE)
ProductsRouter.post('/create', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "⚠️ Name and price are required!" });
        }
        const result = await req.db.collection('products').insertOne({ name, price, description });
        res.status(201).json({ message: "✅ Product created successfully!", productId: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✏️ Cập nhật sản phẩm (UPDATE)
ProductsRouter.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;
        const result = await req.db.collection('products').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, price, description } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "⚠️ Product not found or no changes made!" });
        }
        res.status(200).json({ message: "✅ Product updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🗑️ Xóa sản phẩm (DELETE)
ProductsRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await req.db.collection('products').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "⚠️ Product not found!" });
        }
        res.status(200).json({ message: "✅ Product deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = ProductsRouter;


