const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String }, // Optional image URL for the article
    createdAt: { type: Date, default: Date.now }, // Automatically set creation time
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);
