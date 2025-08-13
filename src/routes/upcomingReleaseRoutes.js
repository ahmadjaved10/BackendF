// routes/upcomingReleaseRoutes.js

const express = require('express');
const { getUpcomingReleases, postRelease, getReleaseById } = require('../controllers/upcomingReleaseController');
const isAdmin = require('../middlewares/isAdmin'); 
const auth = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.get('/upcomingreleases', getUpcomingReleases);
router.get('/upcomingreleases/:id', getReleaseById); // New route for fetching by ID
router.post('/release', auth, isAdmin, postRelease);

module.exports = router;
