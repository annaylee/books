const mongoose = require('mongoose');
const path = require('path');
const coverImageBasePath = 'uploads/bookCovers';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    publishDate: { type: Date, required: true },
    pageCount: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    coverImageName: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' }
});

// create a virtual property of book
// use function(), not arrow function because of 'this'
bookSchema.virtual('coverImagePath').get(function(){
    if (this.coverImageName != null){
        // joining 'public' and 'uploads/bookCovers' and cover image file name
        console.log(path.join('/', coverImageBasePath, this.coverImageName));
        return path.join('/', coverImageBasePath, this.coverImageName);
    }
});

module.exports = mongoose.model('Book', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;