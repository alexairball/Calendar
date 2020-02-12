var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    global = require('./routes/application'),
    app = express(),
    http = require('http'),
    passport = require('passport'),
    passportConfig = require('./config/passport'), // mucho important
    path = require('path'),
    bodyParser = require('body-parser'),
    rateLimit = require('express-rate-limit'),
    session = require('express-session');

const registerLimit = ({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 50
});

app.use(express.static(path.join(__dirname, '/public')));

app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ 
    secret: 'TO_CHANGE',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



// #region Routes


app.get('/'/*, global.isAuth*/, routes.index);

// authentication
app.get('/login', user.login);
app.get('/logout', global.destroySession);
app.post('/authenticate', passport.authenticate('local'), (req, res) => { res.redirect('/'); });
app.post('/register', user.register);


// #endregion



app.listen(app.get('port'));