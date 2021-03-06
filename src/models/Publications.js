const mongoose = require("mongoose");

const Publication = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    deleted_at: {
      type: Date,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", Publication);
