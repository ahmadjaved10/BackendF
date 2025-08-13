// src/controllers/boxOfficeController.js
const BoxOffice = require('../models/BoxOffice');

exports.getBoxOfficeInfo = async (req, res) => {
    try {
        const { movieId } = req.params;
        const boxOfficeInfo = await BoxOffice.findOne({ movieId });
        if (!boxOfficeInfo) return res.status(404).json({ message: 'Box office data not found' });

        res.status(200).json({ boxOfficeInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching box office info' });
    }
};
