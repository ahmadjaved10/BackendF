const Movie = require('../models/movieModel');

exports.searchMovies = async (query) => {
  return await Movie.find({ title: { $regex: query, $options: 'i' } });
};
