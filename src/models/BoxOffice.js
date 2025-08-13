// models/BoxOffice.js

const mongoose = require('mongoose');

const boxOfficeSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    openingWeekendEarnings: Number,
    totalEarnings: Number,
    internationalRevenue: Number
});

module.exports = mongoose.model('BoxOffice', boxOfficeSchema);
