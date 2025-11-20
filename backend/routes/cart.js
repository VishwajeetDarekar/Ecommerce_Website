const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const Product = require('../models/Product');

router.get('/', auth, async (req, res) => {
  await req.user.populate('cart.product');
  res.json(req.user.cart);
});

router.post('/add', auth, async (req, res) => {
  const { productId } = req.body;

  const existing = req.user.cart.find(
    item => item.product.toString() === productId
  );

  if (existing) {
    existing.qty += 1;
  } else {
    req.user.cart.push({ product: productId, qty: 1 });
  }

  await req.user.save();
  await req.user.populate('cart.product');
  res.json(req.user.cart);
});

// REMOVE ITEM FROM CART
router.post('/remove', auth, async (req, res) => {
    const { productId } = req.body;

    req.user.cart = req.user.cart.filter(
        item => item.product.toString() !== productId
    );

    await req.user.save();
    await req.user.populate('cart.product');

    res.json(req.user.cart);
});

module.exports = router;
