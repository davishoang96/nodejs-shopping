var passport = require('passport');
var localStrategy = require('passport-local').Strategy();

//serialize and deserialize
password.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});
