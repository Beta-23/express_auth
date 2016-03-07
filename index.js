var express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./models'),
    session = require('express-session'),
    path = require('path'),
    app = express();

var views = path.join(process.cwd(), 'views');

app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
        secret: 'super-secret-private-keyyyyy',
        resave: false,
        saveUninitialized: true
    })
);

app.use(function(req, res, next){
    req.login = function(user){
        req.session.userId = user._id;
    };
    req.currentUser = function(callback){
        db.User.findOne({_id: req.session.userId},
            function(err, user){
                req.user = user;
                callback(null, user);
            });
    };
    req.logout = function(){
        req.session.userId = null;
        req.user = null;
    };
    next();
});

app.get('/login', function(req, res){
    res.sendFile(path.join(views, 'login.html'));
});

app.get('/signup', function(req, res){
    res.sendFile(path.join(views, 'signup.html'));
});

app.post(['/users', '/signup'], function signup(req, res){
    var user = req.body.user;
    var email = user.email;
    var password = user.password;
    db.User.createSecure(email, password, function(){
        res.send(email + ' is registered!\n');
    });
});

app.post(['/sessions', '/login'], function login(req, res){
    var user = req.body.user;
    var email = user.email;
    var password = user.password;
    db.User.authenticate(email, password, function(err, user){
        // res.send(email + ' is logged in\n');
        req.login(user);
        res.redirect('/profile');
    });
});

app.get('/profile', function userShow(req, res){
    req.currentUser(function(err, user){
        if (user === null) {
            res.redirect('/signup');
        } else {
            res.send('Hello ' + user.email);
        }
    });
});

app.listen(3000, function(){
    console.log('Listening on port 3000');
});
