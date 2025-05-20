const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
    {
        username: String,
        text: String,
        createAt: { type: Date, default: Date.now },
    },
    { collection: "comments" }
);

module.exports = mongoose.model("comment", CommentsSchema);
