const express = require ("express");
require('dotenv').config({path: __dirname + '/.env'})
const app = express();
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const json = require ("json");

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useCreateIndex: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"))

///////// PASSPORT CONFIG //////////

app.use(require("cookie-session")({
	secret: "maths kollo api!!!",
	resave: false,
	saveUninitialized : false
}));
app.use(back());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


/////////SCHEMAS/////////////////////

const User = require ("./models/user")


app.post("/users", isAdmin, (req, res) => {
	var NewUser = new User(
		{
			username: req.body.username, name: req.body.name,
			isAdmin: false, year: req.body.year
		}
	);
	User.register(new User (NewUser), req.body.password, (err, user) => {
	if (err){
		console.log(err);
		res.serverError();
	} else {
		res.ok();
	}
})

router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
	res.json( req.user );
});


app.get("/users", isAdmin, (req, res) => {
	try {
        let users = await User.find({});
        res.ok().json(users);
    } catch (e) {
        // log error and send error status 
        console.log(e);
        res.sendStatus(500);
    }
})

const isAdmin = (req,res,next) => {
	if(!req.user){
		return;
	}
	if(req.user.isAdmin){
		return next();
	}	
}

app.listen(process.env.PORT, process.env.IP, ()=> {
	console.log("Server has started");
});