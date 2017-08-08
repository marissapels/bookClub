var db = require("../models");

// CRUD routes for discussions that affect MySQL database
module.exports = function(app){
	// Read all current discussions in database and display on discussions.html
	app.get("/api/discussions", function(req, res){
		db.Chat.findAll().then(function(results){
			res.json(results);
		});
	});

	// Create new discussion in database
	app.post("/api/discussions", function(req, res){
		db.Chat.create({
			chat_name: chatName,
			chat_firebase_id: firebaseId
		}).then(function(results){
			res.json(results);
		});
	});

	// Update discussion in database whenever someone adds to message thread --> May not need since firebase should keep log of chats...
	// app.put("/api/discussions", function(req, res){
	// 	db.Chat.update({}).then(function(results){
	// 		res.json(results);
	// 	});
	// });

	// Delete discussion in database whenever a group member deletes it (don't focus on this too much. make others work first.)
	app.delete("/api/discussions/:id", function(req, res){
		db.Chat.destroy({
      where: {
        id: req.params.id
      }
		}).then(function(results){
			res.json(results);
		});
	});
}