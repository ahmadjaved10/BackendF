const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,  // Changed from ObjectId to String
    required: true
  },
  movie: {
    type: String,  // Changed from ObjectId to String
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  commentsCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
