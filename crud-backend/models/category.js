const mongoose = require("mongoose");

const Category = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    
}, {timestamps : true})


const CategoryModel = mongoose.model("Category" , Category)
module.exports = CategoryModel