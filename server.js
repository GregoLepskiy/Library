var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express();/*,
    books = [
        {
            "name" : "Капитанская дочка",
            "author" : "А.С. Пушкин",
            "image" : "./images/aspuhkin_kapitanskaya-dochka.jpg"
        },
        {
            "name" : "Преступление и наказание",
            "author" : "Ф.М. Достоевский",
            "image" : "./images/fmdostoevskiy_prestuplenie-i-nakazanie.jpg"
        },
        {
            "name" : "Сага о Ведьмаке",
            "author" : "А. Сапковский",
            "image" : "./images/asapkovskiy_saga-o-vedmake.jpg"
        },
        {
            "name" : "Крестный отец",
            "author" : "М. Пьюзо",
            "image" : "./images/mpuzo_krestniy-otets.jpg"
        },
        {
            "name" : "Война и мир",
            "author" : "Л.Н. Толстой",
            "image" : "./images/lntolstoy_voina-i-mir.jpg"
        },
        {
            "name" : "Герой нашего времени",
            "author" : "М.Ю. Лермонтов",
            "image" : "./images/mulermontov_geroy-nashego-vremeni.jpg"
        },
        {
            "name" : "Мертвые души",
            "author" : "Н.В. Гоголь",
            "image" : "./images/nvgogol_mertvie-dushi.jpg"
        }
    ];*/
app.use(express.static(__dirname + "/client"));
var bookSchema = mongoose.Schema({
    name: String,
    author: String,
    image: String
});
var Book = mongoose.model("Book", bookSchema);
http.createServer(app).listen(3000);
app.get("/books.json", function (req, res) {
    Book.find({}, function (err, book) {
        if (err !== null) {
            console.log(err);
        } else {
            res.json(book);
        }
    });
});
app.use(express.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/library', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    }).then(res => {
        console.log('DB is connected')
    }).catch(err => {
        console.log(Error, err.message);
    });
app.post("/books", function (req, res) {
    console.log(req.body);
    var newBook = new Book({"name" : req.body.name,
                            "author" : req.body.author,
                            "image" : req.body.image});
    newBook.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            Book.find({}, function (err, result) {
                if (err !== null) {
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
});