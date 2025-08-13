// routes/searchRoutes.js

const express = require('express');
const { searchMovies } = require('../controllers/searchController');

const router = express.Router();

router.get('/search', searchMovies);

module.exports = router;
