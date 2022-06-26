const {body} = require("express-validator");

module.exports = [
    body('title').not().isEmpty().escape().withMessage("title is required"),
    body('imagePath').not().isEmpty().withMessage("image is required"),
    body('description').not().isEmpty().escape().withMessage("description is required"),
    body('price').not().isEmpty().escape().withMessage("Please add price"),
    // body('status').not().isEmpty().escape().withMessage("status is required"),

];
