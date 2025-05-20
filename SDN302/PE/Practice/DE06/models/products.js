const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
      _id:{
       type:  mongoose.Schema.Types.ObjectId,
       ref: "image",
      },
      url: String,
      caption: String,
    },
    {_id: false, collection: "images", timestamps: false }
  );


const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String },
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    discountPercentage: { type: Number, min: 0 },
    stock: { type: Number, required: [true, 'Stock is required'], min: 0 },
    brand: { type: String, required: [true, 'Brand is required'] },
    thumbnail: { type: String, required: [true, 'Thumbnail is required'] },
    images: [imageSchema],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
}, { collection: 'products' });

module.exports = mongoose.model('product', productSchema);