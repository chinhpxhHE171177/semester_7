// validateArticle.js
module.exports = (req, res, next) => {
    const { title, date, text } = req.body;

    if (!title || !date || !text) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    // Check if date is valid
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date value' });
    }

    next();
};
