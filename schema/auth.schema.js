const { Schema, model } = require("mongoose");

const Auth = new Schema(
  {
    full_name: { type: String, required: true },
    birth_year: { type: Date, required: true },
    death_year: { type: String, required: true },
    bio: { type: String, required: true },
    period: {
      type: String,
      required: true,
      enum: {
        values: [
          "Temuriylar davri",
          "Jadid davri",
          "Sovet davri",
          "Mustaqillik davri",
        ],
        message: "{VALUE} — bunday davr yo'q",
      },
    },
    work: { type: String, required: true },
    region: { type: String, required: true },
    picture:{type: String,required: true}
  },
  { versionKey: false, timestamps: true },
);

module.exports = model("Auth", Auth);
