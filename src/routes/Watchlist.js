const express = require('express');
const { createWatchlist, addToWatchlist, getWatchlist } = require('../controllers/WatchlistController');
const authMiddleware = require('../middlewares/authMiddleware');  // Import auth middleware
const isAdmin = require('../middlewares/isAdmin');  // Import isAdmin middleware (if needed)

const router = express.Router();

// Public route to get watchlist (requires authentication)
router.get('/getwatch', authMiddleware, getWatchlist);

// Protected route to create a new watchlist (requires authentication)
router.post('/create', authMiddleware, createWatchlist);

// Protected route to add a movie to an existing watchlist (requires authentication)
router.post('/:watchlistId/addMovie', authMiddleware, addToWatchlist);

// Admin-only route to update a watchlist (requires authentication + admin role)
router.put('/:id', authMiddleware, isAdmin, (req, res) => {
    // Logic to update watchlist (admin only)
});

// Admin-only route to delete a watchlist (requires authentication + admin role)
router.delete('/:id', authMiddleware, isAdmin, (req, res) => {
    // Logic to delete watchlist (admin only)
});

module.exports = router;


//http://localhost:5000/api/watchlist/getwatch?userId=6738c46d92244952e0234e55