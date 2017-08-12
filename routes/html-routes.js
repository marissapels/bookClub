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
  });

  app.get('/library', isLoggedIn, function(req, res) {
        res.render(path.join(__dirname, "../public/library.html"), {
            user : req.user // get the user out of session and pass to template
        });
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

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
