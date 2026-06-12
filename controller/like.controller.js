const mongoose = require("mongoose");
const CustomErrorHandler = require("../error/error");
const CitationSchema = require("../schema/citation.schema");
const LikeSchema = require("../schema/like.schema");

const like = async (req, res) => {
  try {
    const { id } = req.params;
    
    const foundedCitation = await CitationSchema.findOne({ _id: id });

    if (!foundedCitation) {
      throw CustomErrorHandler.notFound("Citation not found");
    }
    const foundedUserLike = await LikeSchema.findOne({
      citation_id: id,
      user_id: req.user.id,
    });

    if (!foundedUserLike) {
      await LikeSchema.create({ citation_id: id, user_id: req.user.id });
      return res.status(201).json({ message: "Like qo'shildi", liked: true });
    } else {
      await LikeSchema.deleteOne({ _id: foundedUserLike._id });
      return res.status(200).json({ message: "Like olib tashlandi", liked: false });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { like };