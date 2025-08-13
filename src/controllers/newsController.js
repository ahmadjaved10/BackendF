const NewsArticle = require('../models/newsArticleModel');

exports.getNewsArticles = async (req, res) => {
    try {
        const articles = await NewsArticle.find().sort({ createdAt: -1 }); // Get articles sorted by creation date
        res.status(200).json({ articles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching news articles' });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await NewsArticle.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ article });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching article by ID' });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const { title, content, author, category, imageUrl } = req.body;

        const newArticle = new NewsArticle({
            title,
            content,
            author,
            category,
            imageUrl,
        });

        await newArticle.save();
        res.status(201).json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating article' });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const { title, content, author, category, imageUrl } = req.body;
        const article = await NewsArticle.findByIdAndUpdate(
            req.params.id,
            { title, content, author, category, imageUrl },
            { new: true }
        );

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ message: 'Article updated successfully', article });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating article' });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await NewsArticle.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting article' });
    }
};
