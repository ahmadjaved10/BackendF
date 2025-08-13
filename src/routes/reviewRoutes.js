const express = require('express');
const {
  addReview,
  getReviews,
  deleteReview,
  modifyReview,
  getAllReviewsForAdmin,
  getAverageRating,
  getMostDiscussedReviews,
  getTopRatedReviews
} = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.post('/addreview', authMiddleware, addReview);
router.get('/getreviews/:movieId', authMiddleware, getReviews);
router.get('/average-rating/:movieId', authMiddleware, getAverageRating);

// Admin-only routes
router.delete('/deletereview/:reviewId', authMiddleware, isAdmin, deleteReview);
router.put('/modifyreview/:reviewId', authMiddleware, isAdmin, modifyReview);

router.get('/ad/reviews', authMiddleware, isAdmin, getAllReviewsForAdmin);
router.get('/ad/most-discussed', authMiddleware, isAdmin, getMostDiscussedReviews);
router.get('/ad/top-rated', authMiddleware, isAdmin, getTopRatedReviews);

module.exports = router;
