var express = require("express"),
    http = require("http"),
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
app.get("/books.json", function (req, res) {
    res.json(books);
});
app.get("/authors.json", function (req, res) {
    res.json(authors);
});