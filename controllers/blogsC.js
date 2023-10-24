const blogs = require("../models/blogs");
const Blog = require("../models/blogs");
const blogsRouter = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
  console.log("blog", blog);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

blogsRouter.post("/", async (req, res) => {
  const Body = req.body;

  const user = req.user;

  const blog = new Blog({
    title: Body.title,
    author: Body.author,
    url: Body.url,
    likes: Body.likes,
    user: user.id,
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  res.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;

  const user = request.user;

  const blog = await Blog.findById(blogId);

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(blogId);
    response.status(204).send("blog deleted").end();
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const Body = req.body;
  const blog = {
    title: Body.title,
    author: Body.author,
    url: Body.url,
    likes: Body.likes,
  };
  const theBlog = await Blog.findByIdAndUpdate(req.params.id, blog);
  res.status(204).json(theBlog);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const { comment } = req.body;
  const Body = await Blog.findById(req.params.id);
  const blog = {
    title: Body.title,
    author: Body.author,
    url: Body.url,
    likes: Body.likes,
    comments: Body.comments.concat(comment),
  };
  const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog);
  res.status(204).json(newBlog);
});

module.exports = blogsRouter;
