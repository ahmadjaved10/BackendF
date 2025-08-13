const mongoose = require('mongoose');
const Recommendation = require('../models/recommendationModel');
const Movie = require('../models/movieModel');
const jwt = require('jsonwebtoken');

// Verify if the user is an admin
const verifyAdmin = (req) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from authorization header
    if (!token) {
        throw new Error('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            throw new Error('Not authorized');
        }
        return decoded;  // Return decoded user details (admin)
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

// Add recommendation
exports.addRecommendation = async (req, res) => {
    try {
        const { user: userId, movie: movieId } = req.body;  // Destructure to match your request keys

        const newRecommendation = new Recommendation({
            userId,
            movieId,
            recommendedAt: Date.now(),
            status: 'recommended',
        });

        await newRecommendation.save();
        res.status(201).json({ message: 'Recommendation added successfully', recommendation: newRecommendation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get recommendations for a user
exports.getRecommendationsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Find all recommendations including trending ones
        const recommendations = await Recommendation.find({
            $or: [
                { userId: userId },
                { status: 'trending' }
            ]
        });

        if (!recommendations || recommendations.length === 0) {
            return res.status(404).json({ message: 'No recommendations found for this user' });
        }

        // Extract movie IDs
        const movieIds = recommendations.map(rec => rec.movieId);

        // Fetch the actual movies
        const recommendedMovies = await Movie.find({ '_id': { $in: movieIds } });

        if (!recommendedMovies || recommendedMovies.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }

        res.status(200).json({ 
            recommendedMovies,
            count: recommendedMovies.length 
        });
    } catch (err) {
        console.error('Error in getRecommendationsForUser:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get similar movies based on genre or director
exports.getSimilarMovies = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const similarMovies = await Movie.find({
            $or: [
                { genre: movie.genre },
                { director: movie.director }
            ]
        }).limit(5);

        res.status(200).json({ similarMovies });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get trending movies
exports.getTrendingMovies = async (req, res) => {
    try {
        // First find all trending recommendations
        const trendingRecommendations = await Recommendation.find({ status: 'trending' });
        
        if (!trendingRecommendations || trendingRecommendations.length === 0) {
            return res.status(404).json({ message: 'No trending movies found' });
        }

        // Get the movie IDs
        const movieIds = trendingRecommendations.map(rec => rec.movieId);

        // Fetch the actual movie details
        const trendingMovies = await Movie.find({
            '_id': { $in: movieIds }
        }).select('title genre averageRating poster director releaseDate');

        if (!trendingMovies || trendingMovies.length === 0) {
            return res.status(404).json({ message: 'No trending movies found' });
        }

        res.status(200).json({ 
            trendingMovies,
            count: trendingMovies.length
        });
    } catch (err) {
        console.error('Error in getTrendingMovies:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get top-rated movies
exports.getTopRatedMovies = async (req, res) => {
    try {
        const topRatedMovies = await Movie.find().sort({ averageRating: -1 }).limit(10);
        res.status(200).json({ topRatedMovies });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add movie to trending list (Admin-only)
exports.addTrendingMovie = async (req, res) => {
    try {
        const adminData = verifyAdmin(req); // Check if the user is an admin

        const { movieId } = req.params;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const existingRecommendation = await Recommendation.findOne({ 
            movieId, 
            status: 'trending' 
        });
        
        if (existingRecommendation) {
            return res.status(400).json({ message: 'Movie is already in the trending list' });
        }

        const newTrendingMovie = new Recommendation({
            movieId,
            status: 'trending',
            recommendedAt: Date.now(),
            userId: adminData.userId  // Add the admin's userId
        });

        await newTrendingMovie.save();
        res.status(201).json({ 
            message: 'Movie added to trending list', 
            movie: newTrendingMovie 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add movie to top-rated list (Admin-only)
exports.addTopRatedMovie = async (req, res) => {
    try {
        verifyAdmin(req); // Check if the user is an admin

        const { movieId } = req.params;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const existingRecommendation = await Recommendation.findOne({ movieId });
        if (existingRecommendation) {
            return res.status(400).json({ message: 'Movie is already in the top-rated list' });
        }

        const newTopRatedMovie = new Recommendation({
            movieId,
            status: 'top-rated',
            recommendedAt: Date.now(),
        });

        await newTopRatedMovie.save();
        res.status(201).json({ message: 'Movie added to top-rated list', movie: newTopRatedMovie });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete movie from trending list (Admin-only)
exports.deleteTrendingMovie = async (req, res) => {
    try {
        verifyAdmin(req); // Check if the user is an admin

        const { movieId } = req.params;

        const movieToDelete = await Recommendation.findOneAndDelete({ movieId, status: 'trending' });

        if (!movieToDelete) {
            return res.status(404).json({ message: 'Movie not found in trending list' });
        }

        res.status(200).json({ message: 'Movie removed from trending list', movie: movieToDelete });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete movie from top-rated list (Admin-only)
exports.deleteTopRatedMovie = async (req, res) => {
    try {
        verifyAdmin(req); // Check if the user is an admin

        const { movieId } = req.params;

        const movieToDelete = await Recommendation.findOneAndDelete({ movieId, status: 'top-rated' });

        if (!movieToDelete) {
            return res.status(404).json({ message: 'Movie not found in top-rated list' });
        }

        res.status(200).json({ message: 'Movie removed from top-rated list', movie: movieToDelete });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
