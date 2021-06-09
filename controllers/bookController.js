var Book = require("../models/book.js"),
    Author = require("../models/author.js"),
    User = require("../models/user.js"),
    BooksController = {};

BooksController.index = function (req, res) {
    console.log("called action: index from book");
    var authorID = req.params.authorID || null,
        bookID = req.params.bookID || null,
        respondWithBooks = function (query) {
            Book.find(query, function (err, book) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(book);
                }
            });
        };
    if (authorID !== null) {
        Author.find({"authorID" : authorID}, function (err, result) {
            if (err) {
                res.status(500).json(err);
            } else if (result.length === 0) {
                res.status(404).json({"result_length" : 0});
            } else {
                if (bookID === null){
                    respondWithBooks({"authorID" : result[0]._id});
                } else {
                    console.log("bookID: ", bookID);
                    console.log("authorID: ", authorID);
                    respondWithBooks({"bookID" : bookID,
                                      "authorID" : result[0]._id});
                }
            }
        });
    } else if (bookID !== null) {
        respondWithBooks({"bookID" : bookID});
    } else {
        respondWithBooks({});
    }
};

BooksController.create = function (req,res) {
    console.log("called action: create from book");
    var authorID = req.params.authorID || null,
        newBook = new Book({"bookID" : req.body.bookID,
                            "name" : req.body.name,
                            "type" : req.body.type,
                            "picture" : req.body.picture,
                            "description" : req.body.description});
    Author.find({"authorID" : authorID}, function (err, result) {
        if (err !== null) {
            console.log(err);
            res.status(500).json(err);
        } else {
            if (result.length === 0) {
                res.status(500).json("Author not found");
                return;
            } else {
                newBook.authorID = result[0]._id;
            }
            newBook.save(function (err, resultB) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(resultB);
                }
            });
        }
    });
};

BooksController.show = function (req, res) {
    console.log("called action: show from BOOK");
    var id = req.params.id;
    Book.find({"_id" : id}, function (err, books) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (books.length !== 0) {
                res.status(200).json(books[0]);
            } else {
                res.status(404).json("Not Found");
            }
        }
    });
};

BooksController.update = function (req, res) {
    console.log("called action: update from BOOK");
    var id = req.params.id,
        newBook = {$set : {name : req.body.name,
                           type : req.body.type,
                           picture : req.body.picture,
                           description : req.body.description}};
    Book.updateOne({"_id" : id}, newBook, function(err, book) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (book.n === 1 && book.nModified === 1 && book.ok === 1) {
                console.log("changed book");
                res.status(200).json(book);
            } else {
                res.status(404).json({"status" : 404});
            }
        }
    });
};

BooksController.destroy = function (req, res) {
    console.log("called action: destroy from book");
    var id = req.params.id;
    Book.deleteOne({"_id" : id}, function (err, book) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (book.n === 1 && book.deletedCount === 1 && book.ok === 1) {
                console.log("deleted from list");
                res.status(200).json(book);
            } else {
                res.status(404).json({"status" : 404});
            }
        }
    });
    User.find({"busket" : id}, function (err, result) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (result.length !== 0) {
                for (let book of result[0].busket) {
                    if (book === id) {
                        book.remove();
                        result.save();
                    }
                }
            }
        }
    });
};

module.exports = BooksController;