const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema(
    {
        path: String,
        url: String,
        caption: String,
        createAt: { type: Date, default: Date.now },
    },
    { collection: "images" }
);
const Image = mongoose.model("image", ImagesSchema);
module.exports = Image;

