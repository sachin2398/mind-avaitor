
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authorName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    publication: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);