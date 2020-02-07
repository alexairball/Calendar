var db = require('../models');

exports.index = (req, res) => {
    res.render("apps.ejs");
}

exports.getVisibleApps = (req, res, next) => {
    db.App.findAll({
        attributes: ['id', 'name', 'description', 'image'],
        where: {
            visible: 1
        },
        include: {
            model: db.AppCategory, 
            attributes: ['id', 'name', 'description']
            // as: 'category'
        }
    }).then(data => {
        res.send({ apps: data });
    });
}