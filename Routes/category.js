var express = require('express');
const { createCategory, getAllCategories } = require('../Middlewares/category');
var router = express.Router();

router.post("/category/create", createCategory);
router.get("/categories",getAllCategories);

module.exports = router;