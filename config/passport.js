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

//Middleware
passport.use('local-login', new localStrategy{
  usernameField: 'email',
  passwordField: 'password',
  passRegToCallback: true
}, function(req, email, password, done) {
  User.findOne({email: email}, function(err, user){
    if(err) return done(err);
    if(!user){
      return done (null, false, req,flash('loginMessage','No user has been found'));
    }

    if(!user.comparePassword(password){
      return done(null, false, req.flash('loginMessage', 'Wrong Password!'));
    }
    return done(null, user);
    })
  })
});

exports.isAuthenticated = function(req ,res ,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
