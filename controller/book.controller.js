const CustomErrorHandler = require("../error/error");
const Book = require("../schema/book.schema");

const getAllBooks = async (req, res, next) => {
  try {
    const { period, genre, search, page = 1, limit = 14 } = req.query;
    const filter = {};

    if (period) filter.period = period;
    if (genre) filter.genre = genre;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ books });
  } catch (error) {
    next(error);
  }
};

const getOneBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return next(CustomErrorHandler.notFound("Kitob topilmadi"));
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  try {
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const book = await Book.create({ ...req.body, cover_url: fileUrl });
    res.status(201).json({ message: "Kitob qo'shildi", book });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (req.file) update.cover_url = `/uploads/${req.file.filename}`;

    const book = await Book.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!book) return next(CustomErrorHandler.notFound("Kitob topilmadi"));
    res.json({ message: "Kitob yangilandi", book });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return next(CustomErrorHandler.notFound("Kitob topilmadi"));
    res.json({ message: "Kitob o'chirildi" });
  } catch (error) {
    next(error);
  }
};

const getBooksStats = async (req, res, next) => {
  try {
    const stats = await Book.aggregate([
      { $group: { _id: "$period", count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
  getBooksStats,
};
