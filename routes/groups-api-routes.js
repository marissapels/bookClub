var db = require("../models");

module.exports = function (app) {

    //get all groups for a user

    app.get("/api/groups", function (req, res) {
        db.User.findById(1)
            .then(function (user) {
                user.getGroups()
                    .then(function (groups) {
                        res.json(groups);
                    });
            });
    })

    app.get("/api/groups/members", function (req, res) {
        db.Group.findById(1)
            .then(function (group) {
                group.getUsers()
                    .then(function (members) {
                        res.json(members);
                    })
            })
    })

    app.get("/api/discussions", function(req, res) {
        db.Discussion.findAll({})
        .then(function(discussions) {
            res.json(discussions)
        })
    })

}