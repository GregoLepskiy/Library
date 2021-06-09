var Author = require("../models/author.js"),
    Book = require("../models/book.js"),
    AuthorController = {};

AuthorController.index = function (req, res) {
    console.log("called action: index from author");
    var authorID = req.params.authorID || null,
        respondAut = function (query) {
            Author.find(query, function (err, authors) {
                if (err !== null) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(authors);
                }
            });
        };
    if (authorID !== null) respondAut({"authorID" : authorID});
    else respondAut({});
};

AuthorController.show = function (req, res) {
    console.log("called action: show from author");
    Author.find({"authorID" : req.params.authorID}, function (err, authors) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (authors.length !== 0) {
                res.sendfile("../client/index.html");
            } else {
                res.status(404).json("Not Found");
            }
        }
    });
};

AuthorController.create = function (req, res) {
    console.log("called action : create from author");
    var authorID = req.body.authorID,
        surname = req.body.surname,
        name = req.body.name,
        patronymic = req.body.patronymic;
    Author.find({"authorID" : authorID,
                "surname" : surname,
                "name" : name,
                "patronymic" : patronymic},
                function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else if (result.length !== 0) {
            res.status(501).send("Author is already consist");
        } else {
            var newAuthor = new Author({"authorID" : authorID,
                                        "surname" : surname,
                                        "name" : name,
                                        "patronymic" : patronymic});
            newAuthor.save(function (err, result) {
                console.log(err);
                if (err !== null) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};

AuthorController.update = function (req, res) {
    console.log("called action : update from author");
    var oldauthorID = req.params.authorID;
    var newAuthor = {$set :{surname : req.body.surname,
                            name : req.body.name,
                            patronymic : req.body.patronymic}};
    console.log("New surname: " + req.body.surname);
    console.log("New name: " + req.body.name);
    console.log("New patronymic: " + req.body.patronymic);
    Author.updateOne({"authorID" : oldauthorID}, newAuthor, function (err, author) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (author.n === 1 && author.nModified === 1 && author.ok === 1) {
                console.log("changed");
                res.status(200).json(author);
            } else {
                res.status(404).json("Not Found");
            }
        }
    });
};

AuthorController.destroy = function (req, res) {
    console.log("called action : destroy from author");
    var id = req.params.id;
    Author.find({"_id" : id}, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else if (result.length !== 0) {
            console.log("Delete all books from this author : " + result[0]._id);
            Book.deleteMany({"authorID" : result[0]._id}, function (err, book) {
                console.log("Deleting author...");
                Author.deleteOne({"_id" : id}, function (err, author) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        if (author.n === 1 && author.ok === 1 && author.deletedCount === 1) {
                            res.status(200).json(author);
                        } else {
                            res.status(404).json({"status" : 404});
                        }
                    }
                });
            });
        } else {
            res.status(404).send("Not Found");
        }
    });
};
module.exports = AuthorController;