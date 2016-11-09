var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")

router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err)
			console.log(err);
		else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user})
		}
	})
});

router.post("/", function(req, res){
	req.user
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = ({name:name, image:image, description:description});
	Campground.create(newCampground,function(err, newlyCreated){
		if(err){

			console.log("Here is error");
		}else{
			res.redirect("campgrounds/index");
		}

	})
})

router.get("/new", function(req, res){
	res.render("campgrounds/new");
});


//Shows more into about one campground
router.get("/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		}else{
			//Render the template of the campground with specific ID

			console.log("Here is error");
			console.log(foundCampground); 
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
})

module.exports = router;
