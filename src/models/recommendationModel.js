const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false  // Changed to false since trending movies don't need userId
  },
  movieId: {
    type: String,
    required: true,
  },
  recommendedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['recommended', 'viewed', 'liked', 'trending', 'top-rated'],  // Added 'trending' and 'top-rated' to enum
    default: 'recommended',
  },
});

module.exports = mongoose.model('Recommendation', recommendationSchema);