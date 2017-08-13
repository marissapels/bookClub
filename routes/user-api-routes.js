var db = require("../models");

module.exports = function(app){
	app.get("/api/users", function (req,res){
		db.User.findAll()
		.then(function(results){
			res.json(results);
		});
	});

	app.post("/api/users", function(req,res){
		db.User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		}).then(function(results){
			res.json(results);
		});
	});
};