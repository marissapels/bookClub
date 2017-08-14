var db = require("../models");

module.exports = function(app){
	app.get("/api/library/", function (req,res){
		db.Library.findAll()
		.then(function(results){
			res.json(results);
		});
	});

	app.post("/api/library", function(req,res){
		db.Library.create({
			title: req.body.title,
			author: req.body.author,
			comments: req.body.comments
		}).then(function(results){
			res.json(results);
		});
	});
};