const express = require('express');
const { getProducts, getProduct, addProduct, replaceProduct, modifyProduct, removeProduct } = require('../controllers/productController');
const { cacheMiddleware } = require('../middleware/cache');
const { invalidateCacheMiddleware } = require('../middleware/invalidateCache');

const router = express.Router();

// check cache first
router.get('/products', cacheMiddleware, getProducts);
router.get('/products/:id', cacheMiddleware, getProduct);

// invalidate cache on success
router.post('/products', invalidateCacheMiddleware, addProduct);
router.put('/products/:id', invalidateCacheMiddleware, replaceProduct);
router.patch('/products/:id', invalidateCacheMiddleware, modifyProduct);
router.delete('/products/:id', invalidateCacheMiddleware, removeProduct);

module.exports = router;
