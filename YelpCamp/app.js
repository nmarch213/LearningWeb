var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var app = express();

//seed DB
seedDB = require("./seeds");

//Models
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

//Routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//MongoDB 
mongoose.connect("mongodb://njm24:testpass@ds035776.mlab.com:35776/yelpcampnjm24");

//Remove Campgrounds and then populate the database
// seedDB();

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

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);



app.listen(3000, function(){
	console.log("YelpCamp Started!");
});