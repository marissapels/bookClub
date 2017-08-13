var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    // ...
  }
));
