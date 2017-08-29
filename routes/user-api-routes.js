var db = require("../models");
// To upload pictures
var path = require('path');
// var fs = require('fs-extra');
// var multer = require('multer');
var util = require('util');
// var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});
var formidable = require("formidable");

module.exports = function(app){
	app.get("/api/users", function (req,res){
		var userId = req.user.id;
		db.User.findAll()
		.then(function(results){
			res.json(results);
		});
	});
  
	app.put("/api/users", function (req,res){
		var userId = req.user.id;
		db.User.update(
		{
			name: req.body.name,
			currentlyReading: req.body.currentlyReading,
			favoriteBook: req.body.favoriteBook,
		},
		{
			where: {
				id: userId
			}
		})
		.then(function(results){
			res.json(results);
		});
	});

	app.post('/uploadpicture', function(req, res){
		var form = new formidable.IncomingForm();
		form.parse(req);
		form.on("fileBegin", function(name, file){
			file.path = __dirname + "\\uploads\\" + file.name;
		});
		form.on("file", function(name,file){
			console.log("Uploaded "+ file.name);
			console.log("file path: "+file.path);
			var pictureLink=file.path;
			console.log("PICTURE LINK: "+pictureLink);
			var userId = req.user.id;
			db.User.update(
			{
				picture: pictureLink
			},
			{
				where: {
					id: userId
				}
			}).then(function(results){
				res.json(results);
			});
		});
		form.on('error', function(err) {
			console.log(err);
		});
		form.on('end', function() {
			console.log("UPLOADED");
			res.end("success");

		});
	});
		// res.sendfile(path.resolve(file.path));

		// res.sendFile(__dirname+"")
		
	app.post("/api/users", function(req,res){
		db.User.create({
			username: req.body.username,
			firebase: req.body.firebase
		})
      .then(function(results){
			res.json(results);
		});
	});
};