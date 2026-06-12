const { Schema, model } = require("mongoose");

const Like = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Auth"
    },
    
    citation_id: { 
      type: Schema.Types.ObjectId,
      required: true, 
      ref: "Citation"
    },
  },
  { versionKey: false, timestamps: true }
);

const LikeSchema = model("Like", Like);
module.exports = LikeSchema;