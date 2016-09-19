var express = require("express");
var handlebars = require("express-handlebars");
var bp = require("body-parser");

var app = express();


app.use(bp.urlencoded({extends: true}));


app.use(express.static(__dirname + '/public'));

	var posts = [
		
	]

// Template Engine - Handlebars
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.get("/", function(req, res){
	res.render("home.handlebars", {thing: req.params.thing});
});

app.get("/posts", function(req, res){


	res.render("posts.handlebars", {post: posts});
});

app.post("/addpost", function(req, res){
	var friend = req.body.newPost;
	posts.push(friend);
	res.redirect("/posts");

});

app.listen(3000, function(){
	console.log("App is running on port 3000");
});