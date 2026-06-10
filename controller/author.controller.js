const CustomErrorHandler = require("../error/error");
const Author = require("../schema/author.schema");

const getALLAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const getOneAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author)  throw CustomErrorHandler.notFound("Author topilmadi");
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const { full_name, birth_year, death_year, bio, period, work, region } =
      req.body;

    if(!req.file) {
      throw CustomErrorHandler.badRequest("file bo'lishi shart")
    }
    await Author.create({
      full_name,
      birth_year,
      death_year,
      bio,
      period,
      work,
      region,
      picture:"http://localhost:4001/uploads/"
    });
    res.status(201).json({ message: "Author qo'shildi" });
  } catch (error) {
    next(error);
  }
};
 
const updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) throw CustomErrorHandler.notFound("Author topilmadi");

    const { full_name, birth_year, death_year, bio, period, work, region } =
      req.body;
    await Author.updateOne(
      { _id: req.params.id },
      { full_name, birth_year, death_year, bio, period, work, region },
    );т 

    res.status(200).json({ message: "Author yangilandi" });
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) throw CustomErrorHandler.notFound("Author topilmadi");

    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Author o'chirildi" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getALLAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
