var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
app = express();

mongoose.connect("mongodb://njm24:test@ds041536.mlab.com:41536/myblog_udemy");

// Template Engine - Handlebars
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride("_method"));

//mongoose schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

//restful routes

app.get("/", function(req, res){
	res.redirect("/blogs");
})


//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	//
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log("error")
			res.redirect("/blogs");
		}
		else{
			console.log("no error");
			res.render("show", {blog: foundBlog});
		}
	})
})

//Show Routes
app.get("/blogs/:id", function(req, res){
	res.send("winner");
})

//INDEX ROUTE
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err)
			console.log("error");
		else{
			res.render("index", {blogs: blogs});
		}
	})
})

//NEW ROUTE
app.get("/blogs/new", function(req, res){
	res.render("new");
	
})


//CREATE ROUTE
app.post("/blogs", function(req, res){
	//create
	Blog.create(req.body.blog, function(err, newBlog){
		if(err)
			res.render("new");
		else{
			res.redirect("/blogs");
		}
	});
})

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect('/blogs');
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
})

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err)
		{
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs/" + req.params.id);
		}
	})
})

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err)
		{
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	})
	//redirect
});




app.listen(3000, function(){
	console.log("Server Running");
})
