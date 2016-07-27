var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,

  profile: {
    name: {type: String, default: ''},
    avatar: {type: String, default: ''}
  }

  address: String,
  history: [{
    date: Date,
    paid: {type: Number, default: 0},

  }]

})

// Hash the password

UserSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt){
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//Compare hashed password with user input from keyboard
UserSchema.methods.comparePass = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
