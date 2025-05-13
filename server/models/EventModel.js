const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: true,
        trim: true,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
      },
    },
    description: {
      en: { type: String },
      ar: { type: String },
    },
    category: {
      en: { type: String },
      ar: { type: String },
    },
    eventDate: {
      type: Date,
      required: true,
    },
    venue: {
      en: { type: String },
      ar: { type: String },
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
