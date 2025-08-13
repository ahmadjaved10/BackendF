const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  awards: [String],
  photos: [String],  // Array of photo URLs
  filmography: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'  // Link each actor to movies they were part of
  }],
});

const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
