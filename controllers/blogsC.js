const blogs = require("../models/blogs")
const Blog = require("../models/blogs")
const blogsRouter = require("express").Router()
blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})
    response.json(blog)
      
  })
  
blogsRouter.get('/:id', async(req,res)=>{
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  const result = await blog.save()
  response.status(201).json(result)
  
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json('blog deleted').end()
})

blogsRouter.put('/:id', async(req,res)=>{
  const Body= req.body
  const blog = {
    title: Body.title,
    author: Body.author,
    url: Body.url,
    likes: Body.likes,
  }
  const theBlog = await Blog.findByIdAndUpdate(req.params.id,blog)
  res.status(204).json(theBlog)
})

module.exports = blogsRouter