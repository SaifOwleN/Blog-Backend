const Blog = require("../models/blogs")
const blogsRouter = require("express").Router()
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const getToken = (req) =>{
  const auth = req.get('Authorization')
  if(auth && auth.startsWith('Bearer ')){
    return auth.replace('Bearer ','')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})
    response.json(blog)
      
  })
  
blogsRouter.get('/:id', async(req,res)=>{
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
  const Body= req.body

  const decodedToken = jwt.verify(getToken(req),process.env.SECRET)
  if(!decodedToken){
    return res.status(401).json({error: 'Token invalid'})
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: Body.title,
    author: Body.author,
    url: Body.url,
    likes: Body.likes,
    user: user.id
  })
  
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()
  
  res.status(201).json(result)
  
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