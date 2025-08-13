// models/movieModel.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: [String], // Genre can be an array to accommodate multiple genres
    director: String,
    actors: [String], // Actors can be an array to accommodate multiple actors
    releaseDate: Date,
    rating: Number, // Movie rating (e.g., from 1 to 10)
    popularity: Number, // Popularity score
    language: String,
    country: String,
    keywords: [String], // Keywords related to the movie
});

movieSchema.index({ title: 'text', genre: 'text', director: 'text', actors: 'text', keywords: 'text' });

module.exports = mongoose.model('Movie', movieSchema);
