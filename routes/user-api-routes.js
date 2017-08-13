var db = require("../models");

module.exports = function(app){
	app.get("/signup", function (req,res){
		db.User.findAll()
		.then(function(results){
			res.json(results);
		});
	});

	app.post("/signup", function(req,res){
		db.User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.secret
		}).then(function(results){
			res.json(results);
		});
	});
};