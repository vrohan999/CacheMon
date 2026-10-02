const { getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct } = require('../services/productService');
const cache = require('../middleware/cache');

async function getProducts(req, res) {
    try {
        const products = await getAllProducts();
        cache.set(req.url, products);
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to Fetch products' });
    }
}

async function getProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product = await getProductById(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        cache.set(req.url, product);
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to Fetch product' });
    }
}

async function addProduct(req, res) {
    try {
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to Create product' });
    }
}

async function replaceProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const updated = await updateProduct(id, req.body);
        if (!updated) return res.status(404).json({ error: 'Product not found' });
        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to Update product' });
    }
}

async function modifyProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const patched = await patchProduct(id, req.body);
        if (!patched) return res.status(404).json({ error: 'Product not found' });
        res.json(patched);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to Patch product' });
    }
}

async function removeProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteProduct(id);
        if (!deleted) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted', product: deleted });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to Delete product' });
    }
}

module.exports = { getProducts, getProduct, addProduct, replaceProduct, modifyProduct, removeProduct };
