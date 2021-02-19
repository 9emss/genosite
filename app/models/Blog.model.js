const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "placeholder.jpg",
    },
  },
  { timestamps: true }
);

module.exports = model("Posts", blogSchema);
