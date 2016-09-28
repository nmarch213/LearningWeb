var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name: "Cloud",
    image: "http://www.photosforclass.com/download/7626464792",
    description: "blah blah blah"
}, {
    name: "River",
    image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
    description: "blah blah blah"
}, {
    name: "Lake",
    image: "http://www.photosforclass.com/download/6015893151",
    description: "blah blah blah"
}]

function seedDB() {

    Campground.remove({}, function(err) {
        if (err) {
            console.log("error")
        } else {
            console.log("Removed Campgrounds");
        }

        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added Campground");
                    //create comment
                    Comment.create(
                    	{
                    		text: "This is okay",
                    		author: "Homer"
                    	}, function(err, comment){
                    		if(err){
                    			console.log(err)
                    		}else{
                    			campground.comments.push(comment);
                    			campground.save();
                    			console.log("Created new comment");
                    		}

                    	})
                }
            })
        })
    });



}

module.exports = seedDB;
