const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },

    author: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    isbn: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 50,
      },

    publisher: {
        type: String,
        required: true,
        maxlength: 1000,
    },

    language: {
        type: String,
        required: true,
        maxlength: 1000,
    },

    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },

    status: {
        type: String,
      },

    photo: {
      data: Buffer,
      contentType: String,
    },

    ratings: [
      {
        text: String,
        ratedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
