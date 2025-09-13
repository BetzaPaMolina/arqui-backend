const express = require('express');
const router = express.Router();


// Rutas CRUD para Productos
const productController = require('../controllers/productController');

// Crear un nuevo producto
router.post('/products', productController.createProduct);

// Obtener todos los productos
router.get('/products', productController.getProducts);

//
router.get('/products/conteo', productController.countProducts);

//costo de todos los productos
router.get('/products/suma-precios', productController.sumProductPrices);

//
router.get('/categories/:id/products', productController.getProductsByCategory);

module.exports = router;

/*
http://localhost:3000/api/products lista de productos

http://localhost:3000/api/products/conteo total de productos

http://localhost:3000/api/products/suma-precios suma de precios

http://localhost:3000/api/categories/1/products productos de la categoría 1
*/