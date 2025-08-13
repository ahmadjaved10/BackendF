const Movie = require('../models/movieModel');

// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    const { title, genre, director, releaseDate, runtime, rating, cast, synopsis, averageRating, coverPhoto, trivia, goofs, soundtrack } = req.body;

    // Validate required fields
    if (!title || !genre || !director || !releaseDate || !runtime) {
      return res.status(400).json({ message: 'Title, genre, director, release date, and runtime are required' });
    }

    // Create a new movie document
    const movie = new Movie({
      title,
      genre,
      director,
      releaseDate,
      runtime,
      rating,
      cast,
      synopsis,
      averageRating,
      coverPhoto,
      trivia,
      goofs,
      soundtrack
    });

    // Save the movie
    await movie.save();

    res.status(201).json({ message: 'Movie added successfully!', movie });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add movie', error });
  }
};

// Get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve movies', error });
  }
};


// Update a movie by ID
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params; // Get movie ID from the URL params
    const { title, genre, director, cast, releaseDate, runtime, synopsis, averageRating, coverPhoto, trivia, goofs, soundtrack } = req.body;

    // Validate required fields
    if (!title || !genre || !director || !releaseDate || !runtime) {
      return res.status(400).json({ message: 'Title, genre, director, release date, and runtime are required' });
    }

    // Find the movie and update its details
    const updatedMovie = await Movie.findByIdAndUpdate(
      id, // Find by movie ID
      { 
        title, 
        genre, 
        director, 
        cast, 
        releaseDate, 
        runtime, 
        synopsis, 
        averageRating, 
        coverPhoto, 
        trivia, 
        goofs, 
        soundtrack 
      },
      { new: true, runValidators: true } // Return the updated movie and validate the fields
    );

    // If no movie is found
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ 
      message: 'Movie updated successfully!', 
      movie: updatedMovie 
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(400).json({ 
      message: 'Failed to update movie', 
      error: error.message 
    });
  }
};
// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: 'Movie deleted successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete movie', error });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve movie', error });
  }
};

