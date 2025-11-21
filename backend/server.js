const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

// CORS FIX – Allow Netlify frontend
app.use(cors({
    origin: "https://stellular-pegasus-982120.netlify.app",   // your Netlify domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Serve frontend (optional for local testing)
app.use(express.static(path.join(__dirname, "../frontend")));

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// API ROUTES (correct prefix)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', require('./routes/orders'));

// Render port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
