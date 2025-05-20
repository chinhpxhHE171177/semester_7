// articles.controller.js

// call action of controller to work 
const result = [
    {
        "id": 1,
        "title": "Article 1",
        "author": "John Doe",
        "date": "2023-06-02"
    },
    {
        "id": 2,
        "title": "Article 2",
        "author": "Jane Smith",
        "date": "2023-12-02"
    },
    {
        "id": 3,
        "title": "Article 3",
        "author": "Alice Johnson",
        "date": "2023-07-02"
    }
];

async function getArticles(req, res) {
    try {
        //res.status(200).json({ "result": "Will send all the articles to you!" });
        res.status(200).json({
            "message": "List of Articles",
            "result": result
        });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function getArticle(req, res) {

    try {
        //res.status(200).json({ "result": "Will send all the articles to you!" });
        const { id } = req.params;
        const result1 = result.find(article => article.id === parseInt(id));

        // res.status(200).json({
        //     "message": "List of Articles",
        //     "result": result1
        // });
        if (!result1) {
            res.status(404).json({ "message": "Article not found!" });
        }
        res.status(200).json(result1);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

module.exports = { getArticles, getArticle };