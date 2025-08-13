// models/UpcomingRelease.js

const mongoose = require('mongoose');

const upcomingReleaseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    trailerUrl: String,
    description: String
});

module.exports = mongoose.model('UpcomingRelease', upcomingReleaseSchema);
