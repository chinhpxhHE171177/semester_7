const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
    {
        name: String,
        description: String
    },
    { collection: "categories" }
);
const Category = mongoose.model("category", CategoriesSchema);

module.exports = Category;
