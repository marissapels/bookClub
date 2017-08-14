module.exports = function(passport) {

  var passport = require('passport')
  var LocalStrategy = require('passport-local').Strategy;
  var User = require("../models/user.js");

  passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

  passport.deserializeUser(function(user, done) {
        User.findAll({
          where: {
            id:user.id
          }
        }, function(err, user) {
            done(err, user);
        });
    });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(email, password, done) {
      User.findAll({ 
        where : {
          email: email 
        }
      }).then(function(user) {


        if (user)
        {
          return done(null, false, {
            message: "That email is already taken"
          });
        } else
        {
          var data={
            email: email,
            password: password
          };

          User.create(data).then(function(newUser, created){
            if (!newUser){
              return done (null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
            console.log("a new user has been created");
          });
        }
      });
  }));

  //LOCAL SIGNIN
passport.use('local', new LocalStrategy(
    {
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true 
    },
    function(req, email, password, done) {
        var User = require("../models/user.js");
        var isValidPassword = function(password) {
        } 
          User.findAll({
              where: {
                  email: email
              }
          }).then(function(user) {
              if (!user) { 
                  return done(null, false, {
                      message: 'Email does not exist'
                  }); 
              }
              if (!isValidPassword(user.password, password)) {
                  return done(null, false, {
                      message: 'Incorrect password.'
                  });
              }
              var userinfo = user.get();
              return done(null, userinfo);
              console.log("successfully signed in");
          }).catch(function(err) {
              console.log("Error:", err);
              return done(null, false, {
                  message: 'Something went wrong with your Signin'
              });
          });
    }
 
));
};

