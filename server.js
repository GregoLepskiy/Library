var express = require("express"),
    http = require("http"),
    app = express(),
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
    ];
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
app.get("/books.json", function (req, res) {
    res.json(books);
});
app.use(express.urlencoded({extended: true}));
app.post("/books", function (req, res) {
    var newBook = req.body;
    console.log(newBook);
    books.push(newBook);
    res.json({"message" : "You're located on server"});
});