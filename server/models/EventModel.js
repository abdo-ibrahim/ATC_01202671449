const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    category: String,
    eventDate: {
      type: Date,
      required: true,
    },
    venue: String,
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
