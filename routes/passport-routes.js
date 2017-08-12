var db = require("../models");

module.exports = function(app){
  app.post('/login',
    passport.authenticate('local', 
      { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
  );
}
