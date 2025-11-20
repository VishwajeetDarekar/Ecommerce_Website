const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(cors());
app.use(express.json());

// ⭐ Serve frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/amazon_htmljs')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', require('./routes/orders'));

app.listen(5000, () => console.log("Server running on 5000"));
