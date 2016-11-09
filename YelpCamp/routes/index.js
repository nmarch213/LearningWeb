var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
	res.render("home");
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
})

//handle login
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect:"/login"
	}), function (req, res) {
		console.log("this is hit")
})

//logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;