const Category = require("../Models/Category")

exports.createCategory = (req, res)=>{
    const category = new Category(req.body);
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "NOT able to save category in DB"
            });
        }
        res.json({ category });
    })
};

exports.getAllCategories = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No Categories Found"
            })
        }
        res.json(categories);
    })

};