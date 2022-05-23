const mongoose = require('mongoose')


let blogSchema = new mongoose.Schema({
    author : String,
    title : String
})

module.exports = mongoose.model('Blog' , blogSchema)