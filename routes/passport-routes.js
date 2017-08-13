var db = require("../models");

module.exports = function(app, passport){
  app.post('/api/users', passport.authenticate('local-signup', {
        successRedirect : '/library', // redirect to the secure profile section
        failureRedirect : '/groups', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  app.post('/login',
    passport.authenticate('local', 
      { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
  );
}
