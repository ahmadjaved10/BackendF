const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    user: { type: String, required: true }, // Changed to String
    title: { type: String, required: true },
    description: { type: String },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('Watchlist', watchlistSchema);