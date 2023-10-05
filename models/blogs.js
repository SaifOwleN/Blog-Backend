const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    author: String,
    url: {
        type:String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user: mongoose.Schema.Types.ObjectId
})

blogSchema.set('toJSON', {
    transform: (document,ob)=>{
        ob.id=ob._id.toString()
        delete ob._id
        delete ob.__v
    }
})

module.exports= mongoose.model('Blog', blogSchema) 