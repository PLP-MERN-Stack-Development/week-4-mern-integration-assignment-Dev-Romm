const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const { validateCategory, validate } = require('../middleware/validate.js');


// GET all categories
router.get('/', categoryController.getAllCategories);

// POST a new category
router.post('/', validateCategory, validate, categoryController.createCategory);

module.exports = router;
