var express = require('express'),
	bodyParser = require('bodyParser'),
	app = express();

app.use(bodyParser.unlencode({extended: true}));

app.get("/signup", function (req, res){
	res.send("Coming soon");
});

var listener = app.listen(3000, function(){
	console.log("Listening on port " + listener.address().port);
});