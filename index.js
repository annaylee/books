if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// use relative path that is required to import the index router
const indexRouter = require('./routes/index');

// set up views & layout
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// set up public folder for static files 
app.use(express.static('public'));

// set up database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const connection = mongoose.connection;
connection.on('error', error => console.error(error));
connection.once('open', ()=> console.log('Database Connected'));

// set up routers
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);
