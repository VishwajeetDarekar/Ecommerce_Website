const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// PLACE ORDER
router.post('/place', auth, async (req, res) => {
    await req.user.populate('cart.product');

    const items = req.user.cart.map(c => ({
        product: c.product,
        qty: c.qty
    }));

    const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    const order = new Order({
        user: req.user._id,
        items,
        total
    });

    await order.save();

    req.user.cart = [];
    await req.user.save();

    res.json({ msg: "Order placed!", order });
});

// GET USER ORDERS
router.get('/', auth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

module.exports = router;
