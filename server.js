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

//Routes examples
app.get('/', function(req, res){
  var name = "davis";
  res.json("Hello " + name);
});

app.get('/home', function(req, res){
  var name = "Stark";
  res.json("Welcome " + name);
})

const PORT = 8080;

app.listen(PORT, function(err){
  if (err) throw err;
  console.log("Server is running on port " + PORT);
});
