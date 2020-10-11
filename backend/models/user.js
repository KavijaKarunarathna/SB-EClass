const mongoose = require("mongoose");
const passportLocalMongoose  = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
	name: String,
	password: String,
	username: {type:String, unique:true}, 
	isAdmin: String, 
	year: String,
	paidForMonth: Boolean,
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);