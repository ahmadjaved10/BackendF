const express = require('express');
const { getNewsArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/newsController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin'); // Assuming only admins can create, update, or delete

const router = express.Router();

// Public routes
router.get('/', getNewsArticles);               // Get all news articles
router.get('/:id', getArticleById);             // Get a specific article by ID

// Protected routes (only accessible for authenticated users or admins)
router.post('/', authMiddleware, isAdmin, createArticle); // Create a new article (admin only)
router.put('/:id', authMiddleware, isAdmin, updateArticle); // Update an article (admin only)
router.delete('/:id', authMiddleware, isAdmin, deleteArticle); // Delete an article (admin only)

module.exports = router;
