const { Router } = require("express");

const adminchecker = require("../middleware/admin.checker");
const upload = require("../middleware/upload.middleware");
const { createCitation, deleteCitation, updateCitation, addCitation } = require("../controller/citation.controller");
const adminChecker = require("../middleware/admin.checker");

const CitationRouter = Router();

CitationRouter.put("/update_citation/:id" , adminChecker , updateCitation)
CitationRouter.delete("/delete_citation/:id", adminchecker, deleteCitation);
CitationRouter.post("/add_citation/:id" , adminChecker , addCitation)

module.exports = CitationRouter;