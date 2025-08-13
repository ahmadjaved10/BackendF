const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  cast: [String],
  releaseDate: { type: Date, required: true },
  runtime: { type: Number, required: true },
  synopsis: String,
  averageRating: Number,
  coverPhoto: String,
  trivia: [String],
  goofs: [String],
  soundtrack: [String]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
