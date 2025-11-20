const router = require('express').Router();
const Product = require('../models/Product');

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  const items = await Product.find();
  res.json(items);
});

// ADD PRODUCT (temporary route)
router.post('/add', async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.json({ msg: "Product added", p });
});

router.get('/:id', async (req, res) => {
    const p = await Product.findById(req.params.id);
    res.json(p);
});

module.exports = router;
