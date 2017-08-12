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

// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

// <fb:login-button 
//   scope="public_profile,email"
//   onlogin="checkLoginState();">
// </fb:login-button>

// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }