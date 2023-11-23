const blogs = require("../models/blogs");
const Blog = require("../models/blogs");
const blogsRouter = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

blogsRouter.post("/", async (req, res) => {
  const Body = req.body;

  const user = req.user;

  if (!Body.content) {
    res.status(406).json("no content written");
  } else {
    const blog = new Blog({
      content: Body.content,
      likes: Body.likes,
      date: Body.date,
      img: Body.img,
      user: user.id,
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    res.status(201).json(result);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;

  const user = request.user;
  const blog = await Blog.findById(blogId);

  if (blog.user.toString() == user._id.toString()) {
    await Blog.findByIdAndDelete(blogId);
    response.status(204).send("blog deleted").end();
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const Body = req.body;
  const blog = {
    content: Body.content,
    likes: Body.likes,
    date: Body.date,
    likes: Body.likes,
  };
  const theBlog = await Blog.findByIdAndUpdate(req.params.id, blog);
  res.status(204).json(theBlog);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const { comment } = req.body;
  const Body = await Blog.findById(req.params.id);
  const blog = {
    content: Body.content,
    likes: Body.likes,
    date: Body.date,
    likes: Body.likes,
    comments: Body.comments.concat(comment),
  };
  try {
    const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      runValidators: true,
    });
    res.status(204).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(422).json(err);
  }
});

blogsRouter.delete("/sdsad", async (req, res) => {
  await Blog.updateMany({}, { $unset: { comments: 1 } });
  res.status(201).json("all comments have been deleted");
});

blogsRouter.delete("/", async (req, res) => {
  await Blog.updateMany({}, { $unset: { likes: 1 } });
  res.status(201).json("all likes have been deleted");
});

blogsRouter.get("/:id/comments", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.status(201).json(blog.comments);
});

blogsRouter.put("/:id/comments/:commentId", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const comment = req.body;
  const comments = blog.comments.filter(
    (item) => item._id != req.params.commentId,
  );
  console.log(comments);
  const conc = comments.concat(comment);
  const updatedBlog = {
    comments: conc,
  };
  const xdd = await Blog.findByIdAndUpdate(req.params.id, updatedBlog);
  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
