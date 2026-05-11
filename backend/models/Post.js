const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "Artisanat",
  },

  stock: {
    type: Number,
    default: 1,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Post", postSchema);