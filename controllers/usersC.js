const User = require('../models/users')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (req,res) => {
    const user = await User.find({}).populate('blogs')
    res.status(200).json(user)
})

userRouter.post('/', async (req,res) => {
    const Body = req.body
    const passwordHash = await bcrypt.hash(Body.password,10)

    if ((Body.username.length < 3)||(Body.password.length < 3 ) ){
        return res.status(400).json({error: "username or password is too short"})
    }

    const newUser = new User({
        username: Body.username,
        name: Body.name,
        passwordHash
    })
    const user = await newUser.save()
    res.status(201).json(user)
})

module.exports = userRouter