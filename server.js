var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    booksController = require("./controllers/bookController.js"),
    authorsController = require("./controllers/authorController.js"),
    usersController = require("./controllers/userController.js"),
    app = express();
    
http.createServer(app).listen(3000);
app.use(express.static(__dirname + "/client"));
app.use('/', express.static(__dirname + "/client"));
app.use('/authors/:authorID', express.static(__dirname + "/client"));
app.use('/authors/:authorID/books/:bookID', express.static(__dirname + '/client'));
app.use('/users/:email/authors/:authorID/books/:bookID', express.static(__dirname + '/client'));
app.use('/users/:email/authors/:authorID', express.static(__dirname + '/client'));
app.use('/users/:email/', express.static(__dirname + '/client'));
app.use(express.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/bynhbufyn', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
}).then(res => {
    console.log("DB is connected");
    console.log(res);
}).catch(err => {
    console.log(Error, err.message);
});

app.get("/authors.json", authorsController.index);
app.post("/authors", authorsController.create);
app.get("/authors/:authorID", authorsController.show);
app.put("/authors/:authorID", authorsController.update);
app.delete("/authors/:id", authorsController.destroy);
app.get("/authors/:authorID/authors.json", authorsController.index);
app.get("/users/:email/authors.json", authorsController.index);
app.get("/authors/:authorID/books/:bookID/authors.json", authorsController.index);
app.get("/users/:email/authors/:authorID/authors.json", authorsController.index);
app.get("/users/:email/authors/:authorID/books/:bookID/authors.json", authorsController.index);


app.get("/books.json", booksController.index);
app.get("/users/:email/books.json", booksController.index);
app.post("/books", booksController.create);

app.get("/authors/:authorID/books.json", booksController.index);
app.get("/users/:email/authors/:authorID/books.json", booksController.index);
app.post("/authors/:authorID/books", booksController.create);
app.put("/authors/:authorID/books/:id", booksController.update);
app.delete("/authors/:authorID/books/:id", booksController.destroy);
app.get("/authors/:authorID/books/:bookID/books.json", booksController.index);
app.get("/authors/:authorID/books/:bookID", booksController.show);
app.get("/users/:email/authors/:authorID/books/:bookID/books.json", booksController.index);

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:email", usersController.show);
app.put("/users/:email", usersController.update);
app.put("/users/:email/authors/:authorID/books/:bookID", usersController.addBook);
app.delete("/users/:email/:id", usersController.deleteBook);
app.delete("/users/:email", usersController.destroy);
app.get("/users/:email/users.json", usersController.index);