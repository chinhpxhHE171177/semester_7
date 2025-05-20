// runCRUD.js

const { MongoClient, ObjectId } = require('mongodb');

const mongodb_url = "mongodb://127.0.0.1:27017";
const dbName = "SDN1828";
const client = new MongoClient(mongodb_url);

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB!");

        const db = client.db(dbName);
        const productsCollection = db.collection('products');

        // 📝 CREATE - Thêm sản phẩm mới
        const insertResult = await productsCollection.insertOne({
            name: 'Smartphone',
            price: 999,
            description: 'High-end smartphone with great features'
        });
        console.log(`📝 Inserted product with ID: ${insertResult.insertedId}`);

        // 🔍 READ - Lấy tất cả sản phẩm
        const allProducts = await productsCollection.find().toArray();
        console.log(`🔍 All products:`, allProducts);

        // 🔍 READ ONE - Lấy một sản phẩm theo ID
        const singleProduct = await productsCollection.findOne({ _id: insertResult.insertedId });
        console.log(`🔎 Single product:`, singleProduct);

        // ✏️ UPDATE - Cập nhật sản phẩm
        const updateResult = await productsCollection.updateOne(
            { _id: insertResult.insertedId },
            { $set: { price: 1099, description: 'Updated smartphone with new features' } }
        );
        console.log(`✏️ Updated ${updateResult.modifiedCount} product(s)`);

        // 🗑️ DELETE - Xóa sản phẩm
        const deleteResult = await productsCollection.deleteOne({ _id: insertResult.insertedId });
        console.log(`🗑️ Deleted ${deleteResult.deletedCount} product(s)`);

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await client.close();
        console.log("🔌 MongoDB connection closed.");
    }
}

run();
