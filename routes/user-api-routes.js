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
			firebase: req.body.firebase
		}).then(function(results){
			res.json(results);
		});
	});
};