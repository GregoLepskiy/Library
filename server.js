var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express(),
    authors = [
        {
            "name" : "Александр",
            "surname" : "Пушкин",
            "patronymic" : "Сергеевич",
            "id" : "aspushkin"
        },
        {
            "name" : "Федор",
            "surname" : "Достоевский",
            "patronymic" : "Михайлович",
            "id" : "fmdostoevskiy"
        },
        {
            "name" : "Анджей",
            "surname" : "Сапковский",
            "patronymic" : "-",
            "id" : "asapkovskiy"
        },
        {
            "name" : "Лев",
            "surname" : "Толстой",
            "patronymic" : "Николаевич",
            "id" : "lntolstoy"
        },
        {
            "name" : "Иосиф",
            "surname" : "Бродский",
            "patronymic" : "Александрович",
            "id" : "iabrodskiy"
        }
    ],
    books = [
        {
            "name" : "Капитанская дочка",
            "authorID" : "aspushkin",
            "image" : "./images/aspushkin_kapitanskaya-dochka.jpg",
            "type" : "book"
        },
        {
            "name" : "Преступление и наказание",
            "authorID" : "fmdostoevskiy",
            "image" : "./images/fmdostoevskiy_prestuplenie-i-nakazanie.jpg",
            "type" : "book"
        },
        {
            "name" : "Сага о Ведьмаке",
            "authorID" : "asapkovskiy",
            "image" : "./images/asapkovskiy_saga-o-vedmake.jpg",
            "type" : "book"
        },
        {
            "name" : "Сага о Ведьмаке",
            "authorID" : "asapkovskiy",
            "image" : "./images/asapkovskiy_saga-o-vedmake.jpg",
            "type" : "book"
        },
        {
            "name" : "Сага о Ведьмаке",
            "authorID" : "asapkovskiy",
            "image" : "./images/asapkovskiy_saga-o-vedmake.jpg",
            "type" : "book"
        },
        {
            "name" : "Сага о Ведьмаке",
            "authorID" : "asapkovskiy",
            "image" : "./images/asapkovskiy_saga-o-vedmake.jpg",
            "type" : "book"
        },
        {
            "name" : "Война и мир",
            "authorID" : "lntolstoy",
            "image" : "./images/lntolstoy_voina-i-mir.jpg",
            "type" : "book"
        },
        {
            "name" : "Евгений Онегин",
            "authorID" : "aspushkin",
            "image" : "./images/aspushkin_evgeniy-onegin.jpg",
            "type" : "audiobook"
        },
        {
            "name" : "Бродский в стиле джаз",
            "authorID" : "iabrodskiy",
            "image" : "./images/iabrodskiy_brodskiy-v-stile-dzhaz.jpg",
            "type" : "audiobook"
        },
        {
            "name" : "Бродский в стиле джаз",
            "authorID" : "iabrodskiy",
            "image" : "./images/iabrodskiy_brodskiy-v-stile-dzhaz.jpg",
            "type" : "audiobook"
        },
        {
            "name" : "Бродский в стиле джаз",
            "authorID" : "iabrodskiy",
            "image" : "./images/iabrodskiy_brodskiy-v-stile-dzhaz.jpg",
            "type" : "audiobook"
        },
        {
            "name" : "Бродский в стиле джаз",
            "authorID" : "iabrodskiy",
            "image" : "./images/iabrodskiy_brodskiy-v-stile-dzhaz.jpg",
            "type" : "audiobook"
        },
        {
            "name" : "Бродский в стиле джаз",
            "authorID" : "iabrodskiy",
            "image" : "./images/iabrodskiy_brodskiy-v-stile-dzhaz.jpg",
            "type" : "audiobook"
        },
        {
            "name" : "Бродский в стиле джаз",
            "authorID" : "iabrodskiy",
            "image" : "./images/iabrodskiy_brodskiy-v-stile-dzhaz.jpg",
            "type" : "audiobook"
        }
    ];
    
http.createServer(app).listen(3000);
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/bynhbufyn', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
}).then(res => {
    console.log("DB is connected");
}).catch(err => {
    console.log(Error, err.message);
});
var BookSchema = mongoose.Schema({
        name : String,
        authorID : String,
        image : String,
        type : String,
        description : String
    }),
    AuthorSchema = mongoose.Schema({
        name : String,
        surname : String,
        patronymic : String,
        id : String
    });
var Book = mongoose.model("Book", BookSchema),
    Author = mongoose.model("Author", AuthorSchema);
app.get("/books.json", function (req, res) {
    Book.find({}, function (err, Books) {
        if (err !== null) {
            console.log("Error: " + err.message);
        } else {
            res.json(Books);
        }
    });
});
app.get("/authors.json", function (req, res) {
    Author.find({}, function (err, Authors) {
        if (err !== null) {
            console.log("Error: " + err.message);
        } else {
            res.json(Authors);
        }
    });
});