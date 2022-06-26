const CartModel = require("../models/cart");


/// create cart ////

module.exports.createCart = async (req, res) => {
    const newCart = new CartModel(req.body);
    try {
        const saveCart = await newCart.save();
        res.status(201).json(saveCart + "cart has created");
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};


/// update cart ///

module.exports.updateCart = async (req, res) => {
    const { id } = req.params.id;
    try {
        const updatedCart = await CartModel.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(201).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};


//// delete cart ///

module.exports.deleteCart = async (req, res) => {
    const { id } = req.params.id
    try {
        await CartModel.findByIdAndDelete(id);
        res.status(201).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};


//// get user cart ////

module.exports.userCart = async(erq , res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.params.userId });
        res.status(201).json(cart);
      } catch (err) {
        res.status(500).json(err);
      }
};


//// get all carts ///

module.exports.allCarts = async(req , res) => {
    try {
        const carts = CartModel.find();
        res.status(201).json(carts);
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};