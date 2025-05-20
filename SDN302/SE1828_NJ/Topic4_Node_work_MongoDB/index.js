// // npm install -g express || npm i express
// // npm i morgan nodemon
// const express = require('express');
// const morgan = require('morgan');
// const { MongoClient } = require('mongodb');
// const app = express();
// const port = 9999;

// // Khai bao cau hinh lam viec voi mongoDB
// const mongodb_url = "mongodb://127.0.0.1:27017";
// const dbName = "SDN1828";

// // Khoi tao doi tuong ket noi toi MongoDB Server 
// const connection = new MongoClient(mongodb_url);

// // Declare use middleware 'morgan' -> Follow requests to send it 
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Root router 
// app.get('/products/list', async (req, res) => {
//     const db = connection.db(dbName);
//     const collection = db.collection("products");
//     const products = await collection.find({}).toArray();
//     res.status(200).json(products);

// });

// // Create 
// app.post('/products/create', (req, res) => {
//     // Call function list products 

// });

// //app.use('/products', ProductRouter);


// //Change the 404 page 
// app.use((req, res, next) => {
//     res.status(404)
//         .send("Error 404: Page not found");
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//     connectDB()
//         .then(() => console.log)
//         .catch(error => console.error(error.message))
// });


// async function connectDB() {
//     // Tien hanh ket noi 
//     await connection.connect();
//     console.log("Connect to MongoDB successfully!!!");

//     return "Done!";
// }




const express = require('express');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
const ProductsRouter = require('./routers/ProductsRouters');

const app = express();
const port = 9999;

const mongodb_url = "mongodb://127.0.0.1:27017";
const dbName = "SDN1828";
const client = new MongoClient(mongodb_url);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB và gán db vào req
async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB successfully!");
        const db = client.db(dbName);

        // Middleware gán db vào req
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Sử dụng router cho products
        app.use('/products', ProductsRouter);

        // Trang 404
        app.use((req, res) => {
            res.status(404).send("❌ Error 404: Page not found");
        });

        // Lắng nghe server
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });

    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
    }
}

connectDB();

