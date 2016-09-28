var mongoose = require("mongoose");

mongoose.connect("mongodb://njm24:test@ds041536.mlab.com:41536/myblog_udemy");

//Post - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

//User - Email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



var Post = mongoose.model("Post", postSchema);

// var newUser = new User({
// 	email: "char@brown.com",
// 	name: "Char Brown",
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// })

// var newPost = new Post({
// 	title: "apples",
// 	content: "So good"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// })

// newUser.posts.push({
// 	title: "How to brew stuff",
// 	content: "aubfbaufubaf"
// });

// newUser.save();

User.findOne({
	name: "Char Brown"
}, function(err, user){
	if (err) {
		console.log(err)
	}else{
		console.log(user);
	}
})