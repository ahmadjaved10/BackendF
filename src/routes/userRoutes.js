const express = require('express');
const {
  getUserProfile,
  updateUser,
  deleteUser,
  getAllProfiles,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin= require('../middlewares/isAdmin'); // Middleware to check if the user is an admin

const router = express.Router();

// Route to get the user profile
router.get('/profile', authMiddleware, getUserProfile);

// Admin-only routes
// Route to update a user
router.put('/update/:userId', authMiddleware, isAdmin, updateUser);

// Route to delete a user
router.delete('/delete/:userId', authMiddleware, isAdmin, deleteUser);

// Route to get all user profiles (admin-only)
router.get('/all-profiles', authMiddleware, isAdmin, getAllProfiles);


module.exports = router;
