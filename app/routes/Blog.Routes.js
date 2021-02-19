const router = require("express").Router();
const Blog = require("../models/Blog.model");

const blogs = [
  {
    title: "What is Lorem Ipsum?",
    snippet:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    // author: "Gemss",
    // createdAt: Date.now(),
    // img: "placeholder.jpg",
  },
  {
    title: "What is Lorem Ipsum?",
    snippet:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    // author: "Gemss",
    // createdAt: Date.now(),
    // img: "placeholder.jpg",
  },
];

router.get("/", (req, res) => {
  res.locals.title = "Blog Pages";
  res.locals.type = 2;
  res.render("blog", { blog: blogs });
});

router.get("/new", (req, res) => {
  res.locals.title = "Add New Post";
  res.locals.type = 2;
  res.render("blog/new_post");
});

router.post("/new", async (req, res) => {
  console.log(req.body);

  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });

  try {
    blog = await blog.save();

    res.redirect("/blog");
    console.log(blog.id);
  } catch (e) {
    console.log(e);
  }
});

// router.get('/', (req, res) => {

// });

module.exports = router;
