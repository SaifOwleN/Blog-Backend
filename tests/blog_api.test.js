const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const api = supertest(app)

test('amount of notes test', async()=>{
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength()

})

test('verify id', async()=>{
  
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blog is posted', async () =>{

  const response = await api.get('/api/blogs')
  const initB = response.body.length
  console.log('initB', initB)

  const blog = {
    title: "ahmed post",
    author: "owlen",
    url: "www.xddMOTS.com",
    likes: 0
  }

  await api.post('/api/blogs').send(blog)

  const responseSec = await api.get('/api/blogs')
  const finalB = responseSec.body.length
  expect(finalB).toEqual(initB + 1)
})

test('blog has like property', async () =>{
  const newBlog = {
    title: "ahmed likes",
    author: "owlen",
    url: "www.xddMOTS.com",
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const response = await api.get('/api/blogs')
  const blog = await response.body.find(b=>b.title==newBlog.title)
  expect(blog.likes).toBe(0)
})

test('blog has no title', async () =>{
  const newBlog = {
    "author": "owlen",
    "url": "www.xddMOTS.com",
    "likes": 10
  }

  await api.post('/api/blog').send(newBlog).expect(404)
})

test('testing the deletion by id', async ()=>{
  const newBlog = {
    title:"xDDMOTS will get deleted",
    author: "ana",
    url: "www.x11123sdads.com",
    likes: 111
  }
  await api.post('/api/blogs').send(newBlog)

  const res = await api.get('/api/blogs')
  const theBlog = res.body.find(r=>r.title===newBlog.title)
  console.log('theBlog', theBlog)

  await api.delete(`/api/blogs/${theBlog.id}`).expect(204)

})

test.only('testing updating a blog', async()=>{
  
  const res = await api.get('/api/blogs')
  const theBlog = res.body[0]
  
  const updatedBlog = {
    title: theBlog.title,
    author: theBlog.author,
    url: theBlog.url,
    likes: 69420
  }
  await api.put(`/api/blogs/${theBlog.id}`).send(updatedBlog).expect(204)
  const resT = await api.get('/api/blogs')
  const theBlogT = resT.body[0]
  expect(theBlogT.likes).toEqual(updatedBlog.likes)
})

afterAll(async () => {
  await mongoose.connection.close()
})
