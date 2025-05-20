// const mongoose = require("mongoose");
// const Category = require("./Categories");
// const Comments = require("./Comments");
// const Image = require("./Images");
// const ImagesSchemaEmbed = new mongoose.Schema(
//   {
//     _id:{
//      type:  mongoose.Schema.Types.ObjectId,
//      ref: "Image",
//     },
//     path: String,
//     url: String,
//     caption: String,
//   },
//   {_id: false, collection: "Images", timestamps: false }
// );



// const TutorialsSchema = new mongoose.Schema(
//   {
//     title: String,
//     author: String,
//     images: [ImagesSchemaEmbed],
//     comments: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Comment",
//     }],
//     category: {
//       type:  mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//     },
//   },
//   { timestamps: false, collection: "Tutorials" }
// );

// const Tutorials = mongoose.model("Tutorials", TutorialsSchema);
// module.exports = {
//     Tutorials, Comments
// };


const mongoose = require('mongoose');
const Comment = require('./Comments');

const ImagesSchema = new mongoose.Schema({
  path: { type: String, required: true },
  url: { type: String, required: true },
  caption: { type: String, required: true },
  //createAt: { type: Date, default: Date.now }
});

const TutorialsSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  images: [ImagesSchema],
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  }],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: { type: [String], default: [] }
}, { timestamps: false, collection: "Tutorials" }

);

const Tutorial = mongoose.model("Tutorial", TutorialsSchema);
module.exports = { Tutorial };