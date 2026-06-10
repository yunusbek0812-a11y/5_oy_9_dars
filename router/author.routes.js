const { Router } = require("express");
const {
  getALLAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controller/author.controller");
const auth = require("../middleware/auth.middleware");
const authorValidate = require("../middleware/author.validate.middleware");
const multer = require("../config/multer");

const authorRouter = Router();

authorRouter.get("/get_all_authors", getALLAuthors);
authorRouter.get("/get_one_author/:id", getOneAuthor);
authorRouter.post("/add_author", auth, authorValidate,multer.single("upload-images"),addAuthor);
authorRouter.put("/update_author/:id", auth, authorValidate, updateAuthor);
authorRouter.delete("/delete_author/:id", auth, deleteAuthor);

module.exports = authorRouter;
