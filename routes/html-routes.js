// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));


  app.get("/library", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/library.html"));
  });

  app.get("/groups", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/groups.html"));
  });

  app.get("/discussions", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/discussions.html"));
  });

  app.get("/discover", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/discover.html"));
  });
};
