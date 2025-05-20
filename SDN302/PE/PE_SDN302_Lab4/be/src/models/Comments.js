const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    username: String,
    text: String,
    createAt: { type: Date, default: Date.now },
  },
  { timestamps: false, collection: "Comments" }
);
// const Comments = mongoose.model("Comment", CommentsSchema);
// module.exports = Comments;
module.exports = mongoose.model("Comment", CommentsSchema);
