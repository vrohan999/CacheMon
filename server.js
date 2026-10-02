const express = require('express');
const productRoutes = require('./routes/productRoutes');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use('/', productRoutes);

app.listen(PORT, () => {
    console.log(`app has started...`);
});
