// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Requiring data
var userData = require("./public/data/data-user.js");
var groupData = require("./public/data/data-group.js");
var discussionData = require("./public/data/data-discussion.js");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/library-api-routes.js")(app);
require("./routes/groups-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/discussion-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {

  db.User.bulkCreate(userData);

  db.Group.bulkCreate(groupData);

  db.User.findById(1).then(function (user) {
    user.addGroup([1, 2, 3]);
  });

  db.Discussion.bulkCreate(discussionData);

  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});




