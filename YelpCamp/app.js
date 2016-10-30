var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var app = express();

//seed DB
seedDB = require("./seeds");

//Models
Campground = require("./models/campground");
Comment = require("./models/comment");
User = require("./models/user");

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

//Passport Config
app.use(require("express-session")({
	secret: "Once again winner",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

app.get("/", function(req, res){
	res.render("home");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err)
			console.log(err);
		else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user})
		}
	})
});

app.post("/campgrounds", function(req, res){
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

app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
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
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
})

// COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
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

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
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
	 //create new comment
	 //connect new comment
	 //redireect campground show page
})

//Auth Routes

//Show register form
app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function (err, user) {
		 if(err){
		 	console.log(err);
		 	return res.render("register");
		 } 
		 else{
		 	passport.authenticate("local")(req, res, function(){
		 		res.redirect("/campgrounds");
		 	});
		 }
	});
});

//show login form
app.get("/login", function(req, res){
	res.render("login");
})

//handle login
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect:"/login"
	}), function (req, res) {
		console.log("this is hit")
})

//logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(3000, function(){
	console.log("YelpCamp Started!");
});