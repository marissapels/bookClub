var db = require("../models");

// CRUD routes for discussions that affect MySQL database
module.exports = function(app){
	// Read all current discussions in database and display on discussions.html
	app.get("/api/group/discussions", function(req, res){
		db.Group.findAll({
			include: [db.Discussion]
		}).then(function(results){
			res.json(results);
		});
	});

	// app.get("/api/:groups/discussions", function(req, res){
	// 	db.Group.findById(req.params.groups)
	// 		.then(function(group){
	// 			group.getDiscussions()
	// 				.then(function(discussions){
	// 					res.json(discussions)
	// 				})
	// 		});
	// })

	// Create new discussion in database
	app.post("/api/groups/:group/discussions", function(req, res){
		db.Discussion.create({
			name: req.body.name,
			GroupId: req.params.group
		}).then(function(results){
			res.json(results)
		});
	});

	// Delete discussion in database whenever a group member deletes it (don't focus on this too much. make others work first.)
	app.delete("/api/discussions/:id", function(req, res){
		db.Discussion.destroy({
      where: {
        id: req.params.id
      }
		}).then(function(results){
			res.json(results);
		});
	});
}