var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

//Models
Campground = require("./models/campground");
// Comment = require("./models/comment");

//MongoDB 
mongoose.connect("mongodb://njm24:testpass@ds035776.mlab.com:35776/yelpcampnjm24");


// Campground.create(
// 	{
// 		name: "Mountain Goat's Rest", 
// 		image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
// 		description: "Huge Granite Hill"
// 	}, function(err, campground){
// 	if(err)
// 		console.log(err)
// 	else{
// 		console.log("New Campground Created");
// 		console.log(campground);
// 	}
// })

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
			console.log(err)
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
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err)
		}else{
			//Render the template of the campground with specific ID
			console.log(foundCampground);
			res.render("show", {campground:foundCampground});
		}
	});
})



app.listen(3000, function(){
	console.log("YelpCamp Started!");
});