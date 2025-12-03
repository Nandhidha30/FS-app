const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Initialize Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Send tweet (Admin only)
router.post('/tweet', auth, adminAuth, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Tweet message is required' });
    }

    // Check if Twitter credentials are configured
    if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
      return res.status(400).json({ message: 'Twitter API credentials not configured' });
    }

    const tweet = await twitterClient.v2.tweet(message);
    
    res.json({ 
      success: true, 
      message: 'Tweet sent successfully',
      tweetId: tweet.data.id,
      tweetText: message
    });
  } catch (error) {
    console.error('Twitter API Error:', error);
    res.status(500).json({ 
      message: 'Failed to send tweet', 
      error: error.message 
    });
  }
});

// Get recent tweets (for display purposes)
router.get('/recent', async (req, res) => {
  try {
    // This is a mock response since we can't fetch without proper setup
    res.json({
      success: true,
      tweets: [
        {
          id: '1',
          text: 'Welcome to Cactus Haven! 🌵 Your one-stop shop for beautiful cacti and succulents.',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          text: 'New arrivals this week! Check out our rare succulent collection. 🌿',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;