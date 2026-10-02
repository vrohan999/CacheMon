const { delayReadData, readData, writeData } = require('../database/db');

async function getAllProducts() {
    return await delayReadData();
}

async function getProductById(id) {
    const products = await delayReadData();
    return products.find((item) => item.id === id);
}

async function createProduct(productData) {
    const products = await readData();
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await writeData(products);
    return newProduct;
}

async function updateProduct(id, productData) {
    const products = await readData();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { id, ...productData };
    await writeData(products);
    return products[index];
}

async function patchProduct(id, updates) {
    const products = await readData();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    await writeData(products);
    return products[index];
}

async function deleteProduct(id) {
    const products = await readData();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const deleted = products.splice(index, 1);
    await writeData(products);
    return deleted[0];
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };
