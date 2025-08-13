const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Public routes
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);

// Protected admin-only routes
router.post('/add', authMiddleware, isAdmin, movieController.addMovie);
router.put('/:id', authMiddleware, isAdmin, movieController.updateMovie);
router.delete('/:id', authMiddleware, isAdmin, movieController.deleteMovie);

module.exports = router;