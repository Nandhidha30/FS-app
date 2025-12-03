const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get user cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await cart.save();
    
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json({ success: true, cart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update cart item
router.put('/update/:productId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === req.params.productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    } else {
      item.quantity = quantity;
    }

    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await cart.save();
    
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await cart.save();
    
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;