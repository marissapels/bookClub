var db = require("../models");

module.exports = function (app) {

    /*     app.get("/api/test", function (req, res) {
            db.User.findById(1).then(function (user) {
                user.getGroups({ include: [db.Discussion] })
            })
        });
    
        app.get("/api/test2", function (req, res) {
            db.Discussion.findAll({
                where: {
                    id: 1
                },
                include: [db.Group.getUsers()]
            }).then(function (data) {
                //dbdata[0].Group.id
                res.json(data);
            })
            
        }); */

    /*         app.get("/api/id", function (req, res) {
                db.User.findById(1)
            })
     */

    app.get("/api/users/:user/groups/discussions", function (req, res) {

        db.User.findById(req.params.user)
            .then(function (user) {
                user.getGroups({
                    include: [db.Discussion]
                })
                    .then(function (groups) {
                        res.json(groups);
                    });
            });
    });

    app.get("/api/users/:user/groups/", function (req, res) {

        db.User.findById(req.params.user)
            .then(function (user) {
                user.getGroups()
                    .then(function (groups) {
                        res.json(groups);
                    });
            });
    });

    app.post("/api/users/:user/groups", function (req, res) {
        db.User.findById(req.params.user)
            .then(function (user) {
                user.addGroup(req.body.Ids)
                    .then(function (result) {
                        res.json(result);
                    })
            })
    });

    app.get("/api/groups", function (req, res) {
        db.Group.findAll({})
            .then(function (groups) {
                res.json(groups);
            })
    });

    app.post("/api/groups", function (req, res) {
        db.Group.create({
            name: req.body.name
        })
            .then(function (result) {
                res.json(result);
            })
    });


    app.post("/api/users", function (req, res) {
        db.User.create({
            username: req.body.username,
            firebase: req.body.firebase
        }).then(function (results) {
            res.json(results);
        });
    });


    app.get("/api/groups/:id/members", function (req, res) {
        db.Group.findById(req.params.id)
            .then(function (group) {
                group.getUsers()
                    .then(function (members) {
                        res.json(members);
                    })
            })
    });


    app.get("/api/users", function (req, res) {
        db.User.findAll({})
            .then(function (users) {
                res.json(users);
            })
    });

    app.post("/api/groups/:id/members", function (req, res) {
        db.Group.findById(req.params.id)
            .then(function (group) {
                group.addUser(req.body.id)
                    .then(function (result) {
                        res.json(result);
                    })
            })
    });


}


