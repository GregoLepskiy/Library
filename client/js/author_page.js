var main = function () {
    "use strict"

    $(document).ready(function () {
        function init (callback) {
            $.getJSON("authors.json", function (authors) {
                callback(authors[0]);
            });
        }

        init(function (author) {
            $author = author;
            $("#main_name").text(fio($author));
            $("title").text(fio($author));
            pushBooks();
        });

        var $author,
            fio = function (author) {
                var result = "";
                result += author.name[0] + '.';
                if (author.patronymic !== "-") {
                    result += author.patronymic[0] + '.';
                }
                result += author.surname;
                return result;
            },
            pushBooks = function () {
                var $content = $("<ul>");
                $.getJSON("books.json", function (books) {
                    console.log(books);
                    $content.append("<h2>Книги</h2>");
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].type === "book") {
                            let $li = $("<li>");
                            for (let j = 0; j < 5; j++) {
                                if (books[i].type === "book") {
                                    let $book = $("<div>").addClass("book width_220 height_350"),
                                        $image_div = $("<div>").addClass("image_div"),
                                        $image = $("<img>").addClass("image_book width_200 height_305"),
                                        $info = $("<div>").addClass("info"),
                                        $book_name = $("<a>").text(books[i].name).attr("alt", books[i].bookID).addClass("bk_name").attr("href", "books/" + books[i].bookID + "/book.html");
                                    $book_name.attr("id", "book_href");
                                    $info.append($book_name);
                                    $image.attr("src", books[i].picture).attr("alt", books[i].name + ',' + fio($author));
                                    $image_div.append($image);
                                    $book.append($image_div).append($info);
                                    $li.append($book);
                                    i++;
                                    console.log('i:' + i);
                                    console.log("books.length: " + books.length);
                                    console.log('j: ' + j);
                                    if (i === books.length)
                                        break;
                                    if (j === 4) {
                                        i = books.length;
                                    }
                                } else {
                                    if (j !== 0) j--;
                                    i++;
                                    if (i === books.length) break;
                                }
                            }
                            $content.append($li);
                        }
                    }
                    $content.append("<h2>Аудиокниги</h2>");
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].type === "audiobook") {
                            let $li = $("<li>");
                            for (let j = 0; j < 5; j++) {
                                if (books[i].type === "audiobook") {
                                    let $book = $("<div>").addClass("audio"),
                                        $image_div = $("<div>").addClass("image_div"),
                                        $image = $("<img>").addClass("image_audio width_200 height_200"),
                                        $info = $("<div>").addClass("info"),
                                        $book_name = $("<a>").text(books[i].name).attr("alt", books[i].bookID).addClass("bk_name").attr("href", "books/" + books[i].bookID + "/book.html");
                                    $book_name.attr("id", "book_href");
                                    $info.append($book_name);
                                    $image.attr("src", books[i].picture).attr("alt", books[i].name + ',' + fio($author));
                                    $image_div.append($image);
                                    $book.append($image_div).append($info);
                                    $li.append($book);
                                    i++;
                                    console.log('i:' + i);
                                    console.log('j: ' + j);
                                    if (i === books.length)
                                        break;
                                    if (j === 4) {
                                        i = books.length;
                                    }
                                } else {
                                    if (j !== 0) j--;
                                    i++;
                                    if (i === books.length) break;
                                }
                            }
                            $content.append($li);
                        }
                    }
                    $content.append("<h2>Подкасты</h2>");
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].type === "podcast") {
                            let $li = $("<li>");
                            for (let j = 0; j < 5; j++) {
                                if (books[i].type === "podcast") {
                                    let $book = $("<div>").addClass("audio"),
                                        $image_div = $("<div>").addClass("image_div"),
                                        $image = $("<img>").addClass("image_audio width_200 height_200"),
                                        $info = $("<div>").addClass("info"),
                                        $book_name = $("<a>").text(books[i].name).attr("alt", books[i].bookID).addClass("bk_name").attr("href", "books/" + books[i].bookID + "/book.html");
                                    $book_name.attr("id", "book_href");
                                    $info.append($book_name);
                                    $image.attr("src", books[i].picture).attr("alt", books[i].name + ',' + fio($author));
                                    $image_div.append($image);
                                    $book.append($image_div).append($info);
                                    $li.append($book);
                                    i++;
                                    console.log('i:' + i);
                                    if (i === books.length)
                                        break;
                                    if (j === 4) {
                                        i = books.length;
                                    }
                                } else {
                                    if (j !== 0) j--;
                                    i++;
                                    if (i === books.length) break;
                                }
                            }
                            $content.append($li);
                        }
                    }
                });
                $(".content").append($content);
            };
    });
};

$(".document").ready(function () {
    var params = window.location.pathname.split('/');
    if (params.length > 4) {
        $(".authorization").html("");
        $(".authorization").append($("<a>").attr("href", "/users/" + params[2] + "/busket.html").text("Избранное").addClass("izbr"));
        $(".authorization").append($("<a>").attr("href", "/index.html").text("Выход"));
        $("header .container .name a").attr("href", "/users/" + params[2] + "/index.html");
    } else {
        $("header .container .name a").attr("href", "/index.html");
    }
    main();
});