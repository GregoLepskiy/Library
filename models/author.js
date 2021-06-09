var mongoose = require("mongoose"),
    AuthorSchema = mongoose.Schema({
        authorID : String,
        surname : String,
        name : String,
        patronymic : String
    }),
    Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;