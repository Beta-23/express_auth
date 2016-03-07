var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expres-auth');

module.exports.User = require('./user');