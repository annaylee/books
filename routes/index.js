const express = require('express');
const router = express.Router();

// render the 'index' view file. the file name must be quoted
router.get('/', (req,res)=>{
    res.render('index');
});

module.exports = router;