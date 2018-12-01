var passport = require('passport'),
localStrategy = require('passport-local').Strategy,
db = require('../models');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    db.User.find({where: {id: user.id}}).success(function(user) {
        done(null, user);
    }).error(function(err) {
        done(err, null);
    });
});

passport.use(new localStrategy(
   function(username, password, done) {
       db.User.find({where: {username: username}}).success(function(user) {
           passwd = user ? user.password: '';
           isMatch = db.User.validPassword(password, passwd, done, user);
       });
   } 
));