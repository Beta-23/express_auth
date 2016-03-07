var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/signup", function (req, res){
	res.send("Coming soon");
});

var listener = app.listen(3000, function(){
	console.log("Listening on port " + listener.address().port);
});