//dependencies
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt');

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