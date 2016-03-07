var express = require('express'),
	bodyParser = require('bodyParser'),
	app = express();

app.use(bodyParser.unlencode({extended: true}));

app.get("/signup", function (req, res){
	res.send("Coming soon");
});