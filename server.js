var express = require('express'),
    mongoose = require('mongoose'),
    ejs = require('ejs'),
    engine = require('ejs-mate'),
    morgan = require('morgan');

var db_url = "localhost:27017/shopping";

mongoose.connect(db_url,function(err){
  if (err) throw err
  console.log('Connected to database');
});

var app = express();


//Middleware
app.use(morgan('dev'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');



//Routes
app.get('/', function(req, res){
  res.render('home');
})

const PORT = 8080;

app.listen(PORT, function(err){
  if (err) throw err;
  console.log("Server is running on port " + PORT);
});
