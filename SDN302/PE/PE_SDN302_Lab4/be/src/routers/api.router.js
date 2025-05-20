//  const express = require("express");
// const TutorialsController = require("../controllers/Tutorials.controller");
// const CategoriesController = require("../controllers/Categories.controller");


// const router = express.Router();
// // tutorials
// router.get("/tutorials", TutorialsController.index);
// router.get("/tutorials/:id/comments", TutorialsController.getComments);
// router.post("/tutorials/create", TutorialsController.createTutorial);
// router.put("/tutorials/:id/update", TutorialsController.updateTutorial);

// //category
// router.get("/categories", CategoriesController.index);
// module.exports = router;

const express = require('express');
const {
    getAllTutorials,
    getAllCommentsByTutorialID,
    createNewTutorial,
    deleteTutorial
} = require('../controllers/Tutorials.controller');

const router = express.Router();

// GET: / Get all product route -
router.get('/', getAllTutorials);
// GET: /:id/comments Gat all comments by tutorial id
router.get('/:id/comments', getAllCommentsByTutorialID);
//POST: /create Add new a tutorial
router.post('/create', createNewTutorial);
// DELETE: /:id/delete Delete a tutorial by id
router.delete('/:id/delete', deleteTutorial);

module.exports = router;