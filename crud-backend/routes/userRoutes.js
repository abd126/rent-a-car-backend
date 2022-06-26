const express = require("express");
const router = express.Router();
const {register, login, allUsers, user} = require("../controllers/userControllers")
const { registerValidations, loginValidations } = require("../validations/userValidations")

router.post("/register" , registerValidations , register );
router.post("/login", loginValidations , login);
router.get("/users" , allUsers);
router.get("/user/:id" , user);
module.exports = router;