const express = require("express");
const { create, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/categoryControllers");
const router = express.Router();
const categoryValidations = require("../validations/categoryValidations");
const {verifyToken , verifyTokenAndAuthorization , verifyTokenAndAdmin} = require("../services/authorization");
router.post("/create-category" , [categoryValidations , verifyTokenAndAdmin  ], create);
router.get("/categories/:page"  ,  getCategories);
router.get("/fetch-category/:id"  , getCategory);
router.put("/update-category/:id" , [categoryValidations  , verifyTokenAndAdmin] , updateCategory);
router.delete("/delete-category/:id" , [verifyTokenAndAdmin] , deleteCategory)
module.exports = router;