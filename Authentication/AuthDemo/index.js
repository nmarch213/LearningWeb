var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var passportLocalMongoose = require("passport-local-mongoose");
var LocalStrategy = require("passport-local");
mongoose.Promise = global.Promise;


mongoose.connect("mongodb://njm24:test@ds041536.mlab.com:41536/myblog_udemy");

//models
var User = require("./models/user");

var app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
	secret: "big dick damage",
	resave: false,
	saveUninitialized: false
}))

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Template Engine - Handlebars
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


//Routes

app.get("/", function(req, res){
	res.render("home");
})

app.get("/register", function(req, res){
	res.render("register");
})

app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret");
})

app.get("/login", function(req, res){
	res.render("login");
})

app.post("/login", passport.authenticate("local",{
		successRedirect: "/secret",
		failureRedirect: "/login"
	}), function (req, res) {	
});

app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		})
	})
})

app.get("/signout", function (req, res) {
	 req.logout();
	 res.redirect("/");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	console.log("not logged in");
	res.redirect("/login");
}


app.listen(3000, function(){
	console.log("AuthDemo Started!");
});