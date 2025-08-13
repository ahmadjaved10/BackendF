const mongoose = require('mongoose');
const Watchlist = require('../models/Watchlist');
const Movie = require('../models/movieModel');

exports.createWatchlist = async (req, res) => {
    try {
        const { title, description, movieIds, userId } = req.body;

        if (!title || !movieIds || !userId) {
            return res.status(400).json({ message: 'Title, movieIds, and userId are required' });
        }

        // Validate movieIds
        const invalidIds = movieIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
        if (invalidIds.length > 0) {
            return res.status(400).json({ message: 'Invalid movie IDs', invalidIds });
        }

        // Fetch movies
        const movies = await Movie.find({ _id: { $in: movieIds } });
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No valid movies found' });
        }

        // Create the watchlist
        const newWatchlist = new Watchlist({
            user: userId,
            title,
            description,
            movies: movieIds
        });

        const savedWatchlist = await newWatchlist.save();
        res.status(201).json({
            message: 'Watchlist created successfully',
            watchlist: savedWatchlist
        });
    } catch (error) {
        console.error('Error creating watchlist:', error);
        res.status(500).json({ message: 'Error creating watchlist', error: error.message });
    }
};

exports.addToWatchlist = async (req, res) => {
    try {
        const { movieId, userId } = req.body;
        const { watchlistId } = req.params;

        if (!movieId || !userId) {
            return res.status(400).json({ message: 'Movie ID and User ID are required' });
        }

        const watchlist = await Watchlist.findOne({ _id: watchlistId, user: userId });
        if (!watchlist) {
            return res.status(404).json({ message: 'Watchlist not found or user not authorized' });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (watchlist.movies.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in watchlist' });
        }

        watchlist.movies.push(movieId);
        await watchlist.save();

        res.status(200).json({ message: 'Movie added to watchlist', watchlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding movie to watchlist' });
    }
};

exports.getWatchlist = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const watchlist = await Watchlist.findOne({ user: userId }).populate('movies');
        if (!watchlist) {
            return res.status(404).json({ message: 'Watchlist not found' });
        }
        res.status(200).json({ watchlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching watchlist' });
    }
};


//http://localhost:5000/api/watchlist/getwatch?userId=6738c46d92244952e0234e55