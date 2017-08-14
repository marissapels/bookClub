// var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport){
    // app.get('/signup', authController.signup);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/library.html', // redirect to the secure profile section
        failureRedirect : '/login.html', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local', {
        successRedirect : '/library.html', // redirect to the secure profile section
        failureRedirect : '/login.html', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
}
