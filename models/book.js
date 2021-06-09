var mongoose = require("mongoose"),
    ObjectID = mongoose.Schema.Types.ObjectId,
    BookSchema = mongoose.Schema({
        bookID: String,
        name: String,
        type: String,
        picture: String,
        description: String,
        authorID : [{type : ObjectID, ref : "Author"}]
    }),
    Book = mongoose.model("Book", BookSchema);
module.exports = Book;