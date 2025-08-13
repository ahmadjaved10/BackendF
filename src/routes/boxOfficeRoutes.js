// src/routes/boxOfficeRoutes.js
const express = require('express');
const router = express.Router();
const boxOfficeController = require('../controllers/boxOfficeController');

// Route to get box office info by movieId
router.get('/:movieId', boxOfficeController.getBoxOfficeInfo);

module.exports = router;
