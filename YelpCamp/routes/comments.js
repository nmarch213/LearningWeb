var express = require("express");
var router = express.Router({mergeParams: true});

// COMMENTS ROUTES
router.get("/new", isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		}else{
			console.log("Comments page");
			res.render("comments/new", {campground: campground});
		}
	})
})

router.post("/", isLoggedIn, function (req, res) {
	 //lookup using id
	 Campground.findById(req.params.id, function (err, campground) {
	 	 if (err) {
	 	 	console.log(err);
	 	 	res.redirect("/campgrounds")
	 	 }else{
	 	 	Comment.create(req.body.comment, function (err, comment) {
	 	 		 if (err) {
	 	 		 	console.log(err)
	 	 		 } else{
	 	 		 	campground.comments.push(comment);
	 	 		 	campground.save();
	 	 		 	res.redirect("/campgrounds/" + campground._id);
	 	 		 }
	 	 	})
	 	 }
	 })

})

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;