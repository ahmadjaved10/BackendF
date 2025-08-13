const Movie = require('../models/movieModel');

exports.searchMovies = async (req, res) => {
    try {
        const { query, genre, director, cast, releaseYear, rating, decade } = req.query;
        
        let filter = {};
        
        // Flexible searching with multiple conditions
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { cast: { $elemMatch: { $regex: query, $options: 'i' } } }
            ];
        }
        
        // Genre search with multiple variations
        if (genre) {
            filter.genre = { $regex: genre, $options: 'i' };
        }
        
        // Director search
        if (director) {
            filter.director = { $regex: director, $options: 'i' };
        }
        
        // Cast search
        if (cast) {
            filter.cast = { $elemMatch: { $regex: cast, $options: 'i' } };
        }
        
        // Release year filtering
        if (releaseYear) {
            filter.releaseYear = parseInt(releaseYear);
        }
        
        // Decade filtering
        if (decade) {
            const startDecade = parseInt(decade);
            const endDecade = startDecade + 9;
            filter.releaseYear = { $gte: startDecade, $lte: endDecade };
        }
        
        // Rating filtering
        if (rating) {
            filter.averageRating = { $gte: parseFloat(rating) };
        }

        const movies = await Movie.find(filter).limit(20);

        res.status(200).json({ movies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching for movies' });
    }
};