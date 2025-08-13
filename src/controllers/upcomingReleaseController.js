// controllers/upcomingReleaseController.js

const UpcomingRelease = require('../models/UpcomingRelease');

exports.getUpcomingReleases = async (req, res) => {
    try {
        const upcomingReleases = await UpcomingRelease.find().sort({ releaseDate: 1 }).limit(10);
        res.status(200).json({ upcomingReleases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching upcoming releases' });
    }
};

exports.postRelease = async (req, res) => {
    try {
        const { title, releaseDate, trailerUrl, description } = req.body;

        if (!title || !releaseDate) {
            return res.status(400).json({ message: 'Title and release date are required' });
        }

        const newRelease = new UpcomingRelease({
            title,
            releaseDate,
            trailerUrl,
            description
        });

        const savedRelease = await newRelease.save();
        res.status(201).json({ message: 'Release added successfully', release: savedRelease });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding release' });
    }
};

exports.getReleaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const release = await UpcomingRelease.findById(id);
        if (!release) {
            return res.status(404).json({ message: 'Release not found' });
        }
        res.status(200).json({ release });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching release by ID' });
    }
};