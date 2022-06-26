const express = require("express");
const router = express.Router();
const { createCart,
        updateCart,
        deleteCart,
        allCarts,
        userCart }
    = require("../controllers/cartControllers");
const { verifyToken,
        verifyTokenAndAuthorization,
        verifyTokenAndAdmin }
    = require("../services/authorization");

router.post("/create-cart", [verifyToken] , createCart);
router.put("/update-cart/:id" , [verifyTokenAndAuthorization] , updateCart);
router.get("/user-cart/:id" , [verifyTokenAndAuthorization] , userCart);
router.get("/carts" , [verifyTokenAndAdmin] ,  allCarts);
router.delete("/delete-cart/:id" , [verifyTokenAndAuthorization] , deleteCart)

module.exports= router