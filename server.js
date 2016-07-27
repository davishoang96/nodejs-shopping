var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var db_url = "localhost:27017/shopping";
var User = require('./models/user');

mongoose.connect(db_url,function(err){
  if (err) throw err;
  mongoose.Promise = global.Promise;
  console.log('Connected to database');
});

var app = express();


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/create', function(req, res, next){
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  user.address = req.body.address;

  user.save(function(err){
    if (err) next(err);
    res.json('Successfully created a user');
  });
});


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


//Routes
app.get('/', function(req, res){
  res.render('main/home');
})

app.get('/about', function(req, res){
  res.render('main/about');
})

app.get('/signup', function(req, res){
  res.render('main/signup');
})

const PORT = 3000;

app.listen(PORT, function(err){
  if (err) throw err;
  console.log("Server is running on port " + PORT);
});
