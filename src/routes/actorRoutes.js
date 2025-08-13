const express = require('express');
const router = express.Router();
const { createActor, getAllActors, getActorById, updateActor, deleteActor } = require('../controllers/actorController');
const isAdmin = require('../middleware/isAdmin');  // Protect routes for admins

// Routes for actor management (admin access only)
router.post('/actors', isAdmin, createActor);  // Add a new actor
router.get('/actors', getAllActors);  // Get all actors
router.get('/actors/:id', getActorById);  // Get actor by ID
router.put('/actors/:id', isAdmin, updateActor);  // Update actor (admin only)
router.delete('/actors/:id', isAdmin, deleteActor);  // Delete actor (admin only)

module.exports = router;
