//dependencies
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt');

// create user schema
var	UserSchema = new Schema({
	email:{type: String, required: true},
	passwordDigest: {type: String, required: true},
	createdAt: {type: Date, default: Date.now}
});

// create a new user with secure (hashed) password (for sign up)
UserSchema.statics.createSecure = function (email, password, cb){
	// `_this` now references our schema
	var _this = this;
	// generate some salt
  bcrypt.genSalt(function (err, salt) {
    // hash the password with the salt
    bcrypt.hash(password, salt, function (err, hash) {
      // build the user object
      var user = {
        email: email,
        passwordDigest: hash
      };
      // create a new user in the db with hashed password and execute the callback when done
      _this.create(user, cb);
    });
  });
};

// the user schema
var UserSchema = new Schema({
	email: {type: String, required: true},
	passwordDigest: {type: String, require: true},
	createdAt: {type: Date, default: Date.now()}
});

//define user model
var User = mongoose.model('User', UserSchema);
//export user model
module.exports = User;