const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    
      title: {
        type: String,
        required: true,
      },
      imagePath: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },    //sellingPrice
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      status: {
        type: Boolean,
        default: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
     
});

const ProductModel = mongoose.model("Product" , ProductSchema);
module.exports = ProductModel;