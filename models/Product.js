const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
  CM: {
    type: [String],
  },
  INCH: {
    type: [String],
  },
  availableColors: {
    type: [String],
  },
  description: {
    type: String,
  },
  manufacturedBy: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  price: {
    type: [],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
