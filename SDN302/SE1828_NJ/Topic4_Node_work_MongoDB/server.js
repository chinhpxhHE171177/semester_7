//server.js 
// npm i nodemon express mongodb morgan 
// Khai bao thu vien MongoDB driver 
const { MongoClient } = require('mongodb');

// Khai bao cau hinh lam viec voi mongoDB
const mongodb_url = "mongodb://127.0.0.1:27017";
const dbName = "SDN1828";

// Khoi tao doi tuong ket noi toi MongoDB Server 
const connection = new MongoClient(mongodb_url);

async function connectDB() {
    // Tien hanh ket noi 
    await connection.connect();
    console.log("Connect to MongoDB successfully!!!");
    // Xac dinh database can lam viec 
    const db = connection.db(dbName);
    // Chi dinh collection can lam viec 
    const productsCollection = db.collection("products");

    // Xu ly cac chuc nang CRUD tren collection 
    // Them moi 1 document moi vao collection products 
    // productsCollection.insertOne(
    //     {
    //         name: "Iphone 13 Pro",
    //         price: 25000000,
    //         quantity: 100,
    //     }
    // )
    //     .then(result => console.log(result))
    //     .catch(error => console.error(error.message));

    // productsCollection.updateMany(
    //     {
    //         price: { $gt: 1000 }
    //     },
    //     {
    //         $set: { market: 'VietName' }
    //     }
    // )
    //     .then(result => console.log(result))
    //     .catch(error => console.error(error.message));

    // tra ve danh sach doi tuong vua moi insert 
    // productsCollection.find().toArray()
    //     .then(result => console.log(result))
    //     .catch(error => console.error(error.message));

    // productsCollection.findOne(
    //     {
    //         name: "Iphone 13 Pro"
    //     }
    // )
    //     .then(result => console.log(result))
    //     .catch(error => console.error(error.message));


    const result = await productsCollection.insertOne({
        name: "Samsung Galaxy S22 Ultra",
        price: 450000,
        quantity: 250,
    });

    console.log("Inserted document: ", result);

    const insertedId = result.insertedId;
    const insertedDoc = await productsCollection.findOne({ _id: insertedId });

    console.log("Inserted detail document: ", insertedDoc);



    return "Done!";
}

// Thuc thi ung dung 
connectDB()
    .then(() => console.log)
    .catch(error => console.error(error.message))
// .finally(() => connection.close());