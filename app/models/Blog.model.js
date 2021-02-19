const { Schema, model, plugin } = require("mongoose");
const slug = require("mongoose-slug-generator");
const domPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require("string-strip-html");

plugin(slug);

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
      slug_padding_size: 2,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
    },
    img: {
      type: String,
      default: "placeholder.png",
    },
  },
  { timestamps: true }
);

blogSchema.pre("validate", (next) => {
  // Check jika itu deskripsi
  if (this.description) {
    this.description = htmlPurify.sanitize(this.description);
    this.snippet = stripHtml(this.description.substring(0, 200)).result;
  }

  next();
});

module.exports = model("Posts", blogSchema);
