const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas 
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
