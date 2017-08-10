var db = require("../models");

module.exports = function (app) {

    app.get("/api/users/:user/groups/", function (req, res) {

        db.User.findById(req.params.user)
            .then(function (user) {
                user.getGroups()
                    .then(function (groups) {
                        res.json(groups);
                    });
            });
    })


    app.get("/api/groups/:id/members", function (req, res) {
        db.Group.findById(req.params.id)
            .then(function (group) {
                group.getUsers()
                    .then(function (members) {
                        res.json(members);
                    })
            })
    })

    app.get("/api/groups", function(req, res) {
        db.Group.findAll({})
            .then(function (groups) {
                res.json(groups);
            })  
    })

    app.get("/api/users", function (req, res) {
        db.User.findAll({})
            .then(function (users) {
                res.json(users);
            })
    })

    app.post("/api/groups/:id/members", function (req, res) {
        db.Group.findById(req.params.id)
        .then(function (group) {
            group.addUser(req.body.id)
                .then(function(result) {
                    res.json(result);
                })
        })
    })

}

