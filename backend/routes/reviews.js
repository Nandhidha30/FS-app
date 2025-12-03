const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create review
router.post('/', auth, async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    
    const existingReview = await Review.findOne({ user: req.user._id, product });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      user: req.user._id,
      product,
      rating,
      comment
    });

    // Update product rating
    const reviews = await Review.find({ product });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(product, {
      rating: avgRating,
      numReviews: reviews.length
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'name');
    res.status(201).json({ success: true, review: populatedReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update review
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    // Update product rating
    const reviews = await Review.find({ product: review.product });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(review.product, {
      rating: avgRating,
      numReviews: reviews.length
    });

    const updatedReview = await Review.findById(review._id).populate('user', 'name');
    res.json({ success: true, review: updatedReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const productId = review.product;
    await Review.findByIdAndDelete(req.params.id);

    // Update product rating
    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.length > 0 ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length : 0;
    
    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews: reviews.length
    });

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;