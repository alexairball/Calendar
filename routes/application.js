exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else 
        res.redirect('/login');
}

exports.destroySession = (req, res, next) => {
    req.logOut();
    req.session.destroy();
    res.redirect("/");
}