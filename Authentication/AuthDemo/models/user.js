var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
	username: String,
	passowrd: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);