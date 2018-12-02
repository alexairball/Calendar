var passport = require('passport'),
localStrategy = require('passport-local').Strategy,
db = require('../models');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    db.User.findOne({where: {id: user.id}}).then(user => {
        done(null, user);
    }).catch(err => {
        done(err, null);
    });
});

passport.use(new localStrategy(
   function(username, password, done) {
       db.User.findOne({where: {username: username}}).then(user => {
           passwd = user ? user.password: '';
           isMatch = db.User.validPassword(password, passwd, done, user);
       });
   } 
));