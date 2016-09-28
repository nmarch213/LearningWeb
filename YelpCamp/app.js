var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

//seed DB
seedDB = require("./seeds");

//Models
Campground = require("./models/campground");
Comment = require("./models/comment");

//MongoDB 
mongoose.connect("mongodb://njm24:testpass@ds035776.mlab.com:35776/yelpcampnjm24");

//Remove Campgrounds and then populate the database
seedDB();

// Template Engine - Handlebars
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
	res.render("home");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err)
			console.log(err);
		else{
			res.render("index", {campgrounds:allCampgrounds})
		}
	})
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = ({name:name, image:image, description:description});
	Campground.create(newCampground,function(err, newlyCreated){
		if(err){

			console.log("Here is error");
		}else{
			res.redirect("index");
		}

	})
})

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


//Shows more into about one campground
app.get("/campgrounds/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		}else{
			//Render the template of the campground with specific ID

			console.log("Here is error");
			console.log(foundCampground);
			res.render("show", {campground:foundCampground});
		}
	});
})



app.listen(3000, function(){
	console.log("YelpCamp Started!");
});