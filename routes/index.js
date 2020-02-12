var db = require('../models');

exports.index = (req, res) => {
    getVisibleApps().then(apps => {
        res.render("apps", { categories: apps });
    });
}

function getVisibleApps() {
    return new Promise((resolve, reject) => {
        db.AppCategory.findAll({
            attributes: ['name', 'description'],
            include: {
                model: db.App,
                attributes: ['id', 'name', 'description', 'image'],
                where: {
                    visible: 1
                }
            }
        }).then(apps => {
            resolve(apps);
        });
    });
}