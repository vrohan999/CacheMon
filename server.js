const express = require('express');
const app = express();
const fs = require('fs/promises');
const path = require('path');
const port = 3000;

let filepath = path.join(__dirname,"db.json")

async function readData(){
    let data = await fs.readFile(filepath,'utf-8')
    return JSON.parse(data);
}

async function delayReadData(){
    await new Promise((resolve, reject) => {
        setTimeout( resolve, 1500)
    })
    return await readData()
}

app.get('/products', async (req, res) => {
    try{
        let products = await delayReadData()
        res.json(products);
    }
    catch(err){
        console.log(err)
    }
});

app.get('/products/:id', async (req, res) => {
    let key = req.url
    let value = cache[key]

    try{
        let products = await readData();

        let id = parseInt(req.params.id);

        let product = products.find((p) => p.id === id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);
    }
    catch(err){
        console.log(err)
    }

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




let cache = {}
// "/products" -  []
// "/products/1" - {}
//