exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else 
        res.redirect('/login');
}

exports.isAuthAjax = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.send({error: '401', message: 'unauthorized'});
}

exports.destroySession = (req, res, next) => {
    req.logOut();
    req.session.destroy();
    res.redirect("/");
}