const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogsC')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/usersC')

const logger = require('./utils/logger')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl)

logger.info('connecting to', config.mongoUrl )
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app
