var express = require("express");
var request = require("request");

var app = express();

// Template Engine - Handlebars
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.get("/", function(req, res){
	res.render("search");
})

app.get("/results", function(req, res){
	var searchValue = req.query.search;
	var url = "http://www.omdbapi.com/?s=" + searchValue;
	request(url, function(err, response, body){
		if(!err && res.statusCode == 200){
			var data = JSON.parse(body);
			// res.send(data["Search"][0]);
			res.render("results", {data : data});
		}
	});
});


app.listen(3000, function(){
	console.log("App is running on port 3000");
});