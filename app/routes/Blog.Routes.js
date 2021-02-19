const router = require("express").Router();
const Blog = require("../models/Blog.model");

router.get("/new", (req, res) => {
  res.locals.title = "Add New Post";
  res.locals.type = 2;
  res.render("blog/new_post");
});

router.post("/new", async (req, res) => {
  console.log(req.body);

  let blog = new Blog({
    title: req.body.title,
    slug: req.body.slug,
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

router.get("/", async (req, res) => {
  // let post = Blog.findAll();
  res.locals.title = "Blog Pages";
  res.locals.type = 2;

  Blog.find({}, (err, blog) => {
    if (err) return res.send(err);

    res.render("blog", {
      post: blog,
    });
  });
});

router.get("/:slug", (req, res) => {
  res.locals.type = 2;
  Blog.find({ slug: req.params.slug }, (err, data) => {
    if (err) return res.send(err);

    res.render("blog/show", {
      post: data,
    });
  });
});

// router.get("/show", (req, res) => {
//   res.locals.title = "Blog Pages";
//   res.locals.type = 2;
//   Blog.find({}, (err, blog) => {
//     if (err) return res.send(err);

//     res.render("blog/show", {
//       post: blog,
//     });
//   });
// });

// router.get('/', (req, res) => {

// });

module.exports = router;
