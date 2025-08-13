const express = require('express');
const { 
  addRecommendation, 
  getRecommendationsForUser, 
  getSimilarMovies, 
  getTrendingMovies, 
  getTopRatedMovies,
  addTrendingMovie,
  addTopRatedMovie,
  deleteTrendingMovie,
  deleteTopRatedMovie
} = require('../controllers/recommendationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/', authMiddleware, addRecommendation);  // Add a new recommendation
router.get('/:userId', authMiddleware, getRecommendationsForUser);  // Get recommendations for a user
router.get('/similar/:movieId', authMiddleware, getSimilarMovies);  // Get similar movies
router.get('/trending', authMiddleware, getTrendingMovies);  // Get trending movies
router.get('/toprated', authMiddleware, getTopRatedMovies);  // Get top-rated movies

// Admin-only routes
router.post('/trending/:movieId', authMiddleware, addTrendingMovie); // Admin add to trending
router.post('/toprated/:movieId', authMiddleware, addTopRatedMovie); // Admin add to top-rated
router.delete('/trending/:movieId', authMiddleware, deleteTrendingMovie); // Admin delete from trending
router.delete('/toprated/:movieId', authMiddleware, deleteTopRatedMovie); // Admin delete from top-rated

module.exports = router;
