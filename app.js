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
    session = require('express-session'),
    hbs = require('handlebars'),
    exphbs = require('express-handlebars'),
    {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');


app.engine('handlebars', exphbs({ 
    helpers:{
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    },
    handlebars: allowInsecurePrototypeAccess(hbs) 
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'TO_CHANGE', resave: false, saveUninitialized: true }));
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