var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); //Hash password
var ejs = require('ejs'); //HTML engine
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var morgan = require('morgan'); //View debug in console

//Store session on server side
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');

var cookieParser = require('cookie-parser');
var flash = require('connect-flash');


var secret = require('./config/secret');
var User = require('./models/user');

//Connect to mongodb
mongoose.connect(secret.database,function(err){
  if (err) throw err;
  console.log('Connected to database');
});

var app = express();

//Middleware
app.use(function(err, req, res, next) {
  console.log(err);
});

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
  secret: secret.secretKey,
  store: new MongoStore({url: secret.database, autoReconnect: true})
}));

//Flash warning messages

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

//Routes
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);


var PORT = secret.port;

app.listen(PORT, function(err){
  if (err) throw err;
  console.log("Server is running on port " + PORT);
});
