const Review = require('../models/reviewModel');

// Add a new review
exports.addReview = async (req, res) => {
  try {
    if (!req.body.user || !req.body.movie) {
      return res.status(400).json({ error: 'User and movie IDs are required' });
    }

    if (req.body.rating < 1 || req.body.rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const review = new Review({
      user: req.body.user,
      movie: req.body.movie,
      rating: req.body.rating,
      comment: req.body.comment
    });

    await review.save();
    res.status(201).json({ review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews for a specific movie
exports.getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await Review.find({ movie: movieId });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this movie.' });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: error.message });
  }
};

// Admin: Modify a review
exports.modifyReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get average rating for a specific movie
exports.getAverageRating = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await Review.find({ movie: movieId });
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this movie.' });
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    res.status(200).json({ movieId, averageRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch the most discussed reviews (by comments count)
exports.getMostDiscussedReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ commentsCount: -1 }).limit(10); // Assuming a field "commentsCount"
    res.status(200).json({ mostDiscussed: reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch top-rated reviews based on average rating
exports.getTopRatedReviews = async (req, res) => {
  try {
    const reviews = await Review.aggregate([
      { $group: { _id: '$movie', averageRating: { $avg: '$rating' } } },
      { $sort: { averageRating: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({ topRated: reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get all reviews for admin
exports.getAllReviewsForAdmin = async (req, res) => {
  try {
    const reviews = await Review.find({}, 'user movie rating comment createdAt updatedAt');
    
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found.' });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews.' });
  }
};
