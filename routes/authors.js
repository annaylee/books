const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// Route for all authors
// render the 'index' view file. the file name must be quoted
router.get('/', async (req,res)=>{
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { authors: authors, searchOptions: req.query });
    }catch{
        res.redirect('/');
    }
    
});


// Route for new author. 
router.get('/new', (req,res)=>{
    res.render('authors/new', { author: new Author()});
});

// Route for creating a new author
router.post('/', async (req,res)=>{
    const author = new Author({
        name: req.body.name
    });

    try {
        const newauthor = await author.save();
         // res.redirect(`authors/${newAuthor.id}`);
            res.redirect(`authors`);
    }catch{
       
           res.render('authors/new', {
               author: author,
               errorMessage: 'Error creating Author'
          });
    }
 
});

module.exports = router;