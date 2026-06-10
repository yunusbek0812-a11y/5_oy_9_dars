const { body } = require("express-validator");
const CustomErrorHandler = require("../error/error");
const CitationSchema = require("../schema/citation.schema");

const addCitation= async (req, res, next) => {
  try {
     const { book , book_id } = req.body;
    const cover = req.file ? req.file.filename : null;

    await BookSchema.create({
        body, book_id, 
    });

    res.status(201).json({ message: "Kitob qo'shildi" });
  } catch (error) {
    res.status(500).json({
        message: error.message
    });
  }
};

const updateCitation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { book , book_id } = req.body;

        const foundBook = await CitationSchema.findById(id);
        if (!foundBook) return next(CustomErrorHandler.NotFound("Kitob topilmadi"));

        const cover = req.file ? req.file.filename : foundBook.cover;

        await BookSchema.updateOne(
            { _id: id },
            {
                body, book_id
            }
        );

        res.status(200).json({
            message: "Kitob yangilandi"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteCitation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const citation = await CitationSchema.findById(id);

        if (!citation) return next(CustomErrorHandler.NotFound("Citation topilmadi"));

        await CitationSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Citation o'chirildi" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
     updateCitation,
      deleteCitation,
      addCitation
    };  