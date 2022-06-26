const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinaryConfig");
const {createProduct, getProducts, getProduct, updateProduct, deleteProduct, imageUpload} = require("../controllers/productController");
const productValidations = require("../validations/productValidations");
const {verifyToken , verifyTokenAndAuthorization , verifyTokenAndAdmin} = require("../services/authorization");
const parser = require("../utils/multer");
// const path = require("path")
router.post("/create-product" , [productValidations ]  , createProduct);
router.get("/products"  ,  getProducts);
router.get("/fetch-product/:id" , getProduct);
router.put("/update-product/:id" , [ productValidations ,verifyTokenAndAdmin ] , updateProduct);
router.delete("/delete-product/:id" , [verifyTokenAndAdmin] , deleteProduct)
// router.post("/image" , parser.single("image") , imageUpload)
module.exports = router