const { validationResult } = require("express-validator");
const CategoryModel = require("../models/category");

//// create category ////
module.exports.create = async (req, res) => {
    const errors = validationResult(req)
    const { name } = req.body;
    if (errors.isEmpty()) {
        const exist = await CategoryModel.findOne({ name })
        if (!exist) {
            await CategoryModel.create({ name })
            return res.status(201).json({ message: 'Your category has created successfully!!!' })
        } else {
            return res.status(401).json({ errors: [{ msg: `${name} category is already exist` }] })
        }
    } else {
        return res.status(401).json({ errors: errors.array() })
    }

}


//// get all categories////
module.exports.getCategories = async (req, res) => {
    const page = req.params.page;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
        const count = await CategoryModel.find({}).countDocuments();
        const response = await CategoryModel.find({}).skip(skip).limit(perPage).sort({ updatedAt: - 1 })
        return res.status(200).json({ categories: response, perPage, count })
    } catch (error) {
        console.log(error.message)
    }
};

//// get single category/////

module.exports.getCategory = async(req , res) =>{
    const {id} = req.params;
    try {
        const response = await CategoryModel.findOne({_id : id});
        return res.status(200).json({category: response});
    } catch (error) {
        console.log(error.message);
    }
}


//// update category////

module.exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const exist = await CategoryModel.findOne({ name });
        if (!exist) {
            const response = await CategoryModel.updateOne({ _id: id }, { $set: { name } });
        } else {
          return  res.status(200).json({ message: 'your category has updated successfully !'});
        }
    } else {
        return res.status(400).json({ errors: [{ msg: `${name} category is already exist` }] });

    }
};


//// delete category ////

module.exports.deleteCategory = async(req , res) => {
    const { id } = req.params;
    try {
        await CategoryModel.deleteOne({_id : id});
        return res.status(200).json({message : 'category has deleted successfully'})
    } catch (error) {
        console.log(error.message)
      return  res.status(500).json('server initernal error')
    }
};