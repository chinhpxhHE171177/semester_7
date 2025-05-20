const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema(
  {
    path: String,
    url: String,
    caption: String,
    createAt: { type: Date, default: Date.now },
  },
  {collection: "Images", timestamps: false }
);
const Image = mongoose.model("Image", ImagesSchema);
module.exports = Image;

