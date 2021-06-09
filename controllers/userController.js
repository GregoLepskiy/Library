var User = require("../models/user.js"),
    Book = require("../models/book.js"),
    UsersController = {};

User.find({}, function (err, result) {
    if (err) {
        console.log("Something wrong in USER");
        console.log(err);
    } else if (result.length === 0) {
        console.log("New user creation");
        var exampleUser = new User ({"surname" : "newUserSur",
                                     "name" : "newUserN",
                                     "patronymic" : "newUserP",
                                     "email" : "newUserEm@email.com"});
        exampleUser.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Test user saved");
            }
        });
    }
});

UsersController.index = function (req, res) {
    console.log("called action: index from user");
    var email = req.params.email || null,
        respondWithUsers = function (query) {
            User.find(query, function (err, user) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(user);
                }
            });
        };
    if (email !== null){
        respondWithUsers({"email" : email});
    } else {
        respondWithUsers({});
    }
};

UsersController.show = function (req, res) {
    console.log("called action: show from user");
    User.find({"email" : req.params.email}, function (err, users) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (users.length !== 0) {
                res.sendfile("../client/admin.html");
            } else {
                res.status(404).json("Not Found");
            }
        }
    });
};

UsersController.create = function (req, res) {
    console.log("called action: create from user");
    var surname = req.body.surname,
        name = req.body.name,
        patronymic = req.body.patronymic,
        email = req.body.email;
    User.find({"email" : email}, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else if (result.length !== 0) {
            res.status(501).send("User is already consist");
        } else {
            var newUser = new User({"surname" : surname,
                                    "name" : name,
                                    "patronymic" : patronymic,
                                    "email" : email});
            newUser.save(function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};

UsersController.update = function (req, res) {
    console.log("called action: update from user");
    var email = req.params.email,
        newUserData = {$set : {surname : req.body.surname,
                               name : req.body.name,
                               patronymic : req.body.patronymic}
        };
    User.updateOne({"email" : email}, newUserData, function (err, user) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (user.n === 1 && user.nModified === 1 && user.ok === 1) {
                console.log("Successful");
                res.status(200).json(user);
            } else {
                res.status(404).json("Not Found");
            }
        }
    });
};

UsersController.addBook = function (req, res) {
    console.log("called action: addBook from user");
    var email = req.params.email,
        newUserData;
    Book.find({"bookID" : req.params.bookID}, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result.length === null) {
                res.status(404).json("Not Found");
            } else {
                newUserData = {$push : {"busket" : result[0]._id}};
                User.updateOne({"email" : email, "busket" : {$ne : result[0]._id}}, newUserData, function (err, user) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        if (user.n === 1 && user.nModified === 1 && user.ok === 1) {
                            console.log("Successful");
                            res.status(200).json(user);
                        } else {
                            res.status(404).json("Not Found");
                        }
                    }
                });
            }
        }
    });
};

UsersController.deleteBook = function (req,res) {
    console.log("called action: deleteBook from user");
    var email = req.params.email,
        bookID = req.params.id,
        newUserData = {$pull : {"busket" : bookID}};
    User.updateOne({"email" : email}, newUserData, function (err, user) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (user.n === 1 && user.nModified === 1 && user.ok === 1) {
                console.log("Successful");
                res.status(200).json(user);
            } else {
                res.status(404).json("Not Found");
            }
        }
    });
};

UsersController.destroy = function (req, res) {
    console.log("called action: destroy from user");
    var email = req.params.email;
    User.deleteOne({"email" : email}, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.n === 1 && user.deletedCount === 1 && user.ok === 1) {
                console.log("deleted from list");
                res.status(200).json(user);
            } else {
                res.status(404).json({"status" : 404});
            }
        }
    });
};

module.exports = UsersController;