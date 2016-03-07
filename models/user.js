var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var UserSchema = new Schema({
    email: {type: String, required: true},
    passwordDigest: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()}
});

UserSchema.statics.createSecure = function(email, password, callback){
    var _this = this;
    bcrypt.genSalt(function(err, salt){
        bcrypt.hash(password, salt, function (err, hash){
            var user = {
                email: email,
                passwordDigest: hash,
                createdAt: Date.now()
            };
            _this.create(user, callback);
        });
    });
};


UserSchema.statics.authenticate = function(email, password, callback){
    this.findOne({email: email}, function(err, user){
        if(user === null) {
            callback('Cannot find user with that email', null);
        } else if (user.checkPassword(password)) {
            callback(null, user);
        } else {
            callback('password incorrect', user);
        }
    });
};

UserSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.passwordDigest);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;