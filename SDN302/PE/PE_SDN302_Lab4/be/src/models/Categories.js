const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    createAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: false, collection: "Categories" }
);
const Category = mongoose.model("Category", CategoriesSchema);

module.exports = Category;
