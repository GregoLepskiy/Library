var main = function () {
    "use strict"

    $(document).ready(function () {
        function init (callback) {
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    callback(books[0], authors[0]);
                });
            });
        }

        init (function (book, author) {
            $book = book;
            $author = author;
            $("#main_name").text($book.name);
            $("title").text($book.name);
            pushBook();
        });

        function addBut_func () {
            $.ajax({
                url : window.location.pathname.slice(0, -10),
                type : 'PUT',
                data: {}
            }).done(function (response) {
                console.log(response);
                alert("Добавлено");
            }).fail(function (err) {
                console.log("error from add book to busket");
                console.log(err);
            });
        }

        var $book, $author,
            fio = function (author) {
                var result = "";
                result += author.name[0] + '.';
                if (author.patronymic !== "-") {
                    result += author.patronymic[0] + '.';
                }
                result += author.surname;
                return result;
            },
            pushBook = function () {
                var $content = $("<div>").addClass("one_book"),
                    $description = $("<p>").text($book.description),
                    $picture = $("<img>").attr("src", $book.picture).attr("alt", $book.name + "," + fio($author)).addClass("main_image"),
                    $author_name = $("<p>").text("Автор: " + fio($author)),
                    $buyButton = $("<button>").addClass("buy_but").text("Читать"),
                    $addButton = $("<button>").addClass("add_but").text("Добавить").click(function () {
                        addBut_func();
                    }),
                    $but_div = $("<div>").addClass("but_div").append($buyButton),
                    $image_div = $("<div>").addClass("book_image").append($picture),
                    $desc_div = $("<div>").addClass("book_desc").append($description),
                    $author_div = $("<div>").addClass("author_name").append($author_name),
                    $book_alm = $("<div>").addClass("book_alm").append($image_div),
                    params = window.location.pathname.split('/');
                if (params.length > 6) {
                    $but_div.append($addButton);
                }
                $author_div.append($but_div).append($desc_div);
                $book_alm.append($author_div);
                $content.append($book_alm);
                $(".maincontainer .content").append($content);
            };
    });
};

$(".document").ready(function () {
    var params = window.location.pathname.split('/');
    if (params.length > 6) {
        $(".authorization").html("");
        $(".authorization").append($("<a>").attr("href", "/users/" + params[2] + "/busket.html").text("Избранное").addClass("izbr"));
        $(".authorization").append($("<a>").attr("href", "/index.html").text("Выход"));
        $("header .container .name a").attr("href", "/users/" + params[2] + "/index.html");
    } else {
        $("header .container .name a").attr("href", "/index.html");
    }
    main();
});