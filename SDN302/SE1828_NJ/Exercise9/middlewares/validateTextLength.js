// validateTextLength.js
module.exports = (req, res, next) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text field is required' });
    }

    if (text.length < 10 || text.length > 500) {
        return res.status(400).json({ error: 'Text must be between 10 and 500 characters' });
    }

    next();
};
