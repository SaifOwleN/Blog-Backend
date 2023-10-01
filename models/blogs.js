const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document,ob)=>{
        ob.id=ob._id.toString()
        delete ob._id
        delete ob.__v
    }
})

module.exports= mongoose.model('Blog', blogSchema) 