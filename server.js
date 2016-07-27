var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); //Hash password
var ejs = require('ejs'); //HTML engine
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var morgan = require('morgan'); //View debug in console

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var db_url = "localhost:27017/shopping";
var User = require('./models/user');

//Connect to mongodb
mongoose.connect(db_url,function(err){
  if (err) throw err;
  console.log('Connected to database');
});

var app = express();


//Middleware
app.use(morgan('dev'));

//Convert data io json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Use html ejs engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//Default CSS location
app.use(express.static(__dirname + '/public'));

//Session
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "davis"
}));

//Flash warning messages
app.use(flash());

//Routes
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);


const PORT = 3000;

app.listen(PORT, function(err){
  if (err) throw err;
  console.log("Server is running on port " + PORT);
});
