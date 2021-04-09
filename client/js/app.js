var main = function(){
    "use strict"
    
    var tabs = [],
        fio = function (author) {
            var result = "";
            result += author.name[0] + '.';
            if (author.patronymic !== "-") {
                result += author.patronymic[0] + '.';
            }
            result += author.surname;
            return result;
        },
        author_name = function (authors, book) {
            for (var h = 0; h < authors.length; h++) {
                if (authors[h].id === book.authorID) {
                    console.log(fio(authors[h]));
                    return fio(authors[h]);
                }
            }
        }

    tabs.push({
        "name" : "Подборка",
        "content" : function (callback) {

        }
    });
    tabs.push({
        "name" : "Книги",
        "content" : function (callback) {
            var $content = $("<ul>");
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    for (var i = 0; i < books.length; i++) {
                        if (books[i].type === "book") {
                            var $li = $("<li>");
                            for (var j = 0; j < 6; j++) {
                                if (books[i].type === "book") {
                                    var $book = $("<div>").addClass("book width_220 height_350"),
                                        $image_div = $("<div>").addClass("image_div"),
                                        $image = $("<img>").addClass("image_book width_200 height_305"),
                                        $info = $("<div>").addClass("info"),
                                        $book_name = $("<a>").text(books[i].name),
                                        $author_name = $("<a>").text(author_name(authors, books[i]));
                                    $book_name.attr("id", "book_href");
                                    $info.append($book_name).append("<br>").append($author_name);
                                    $image.attr("src", books[i].image).attr("alt", books[i].name + ',' + author_name(authors, books[i]));
                                    $image_div.append($image);
                                    $book.append($image_div).append($info);
                                    $li.append($book);
                                    i++;
                                    console.log('i:' + i);
                                    if (i === books.length)
                                        break;
                                    if (j === 5) {
                                        i--;
                                    }
                                }
                            }
                            $content.append($li);
                        }
                    }
                });
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                console.log(jqXHR);
                console.log(textStatus);
                callback(error, null);
            });
        }
    });
    tabs.push({
        "name" : "Аудиокниги",
        "content" : function (callback) {
            var $content = $("<ul>");
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    for (var i = 0; i < books.length; i++) {
                        if (books[i].type === "audiobook") {
                            var $li = $("<li>");
                            for (var j = 0; j < 6; j++) {
                                if (books[i].type === "audiobook") {
                                    var $book = $("<div>").addClass("audio"),
                                        $image_div = $("<div>").addClass("image_div"),
                                        $image = $("<img>").addClass("image_audio width_200 height_200"),
                                        $info = $("<div>").addClass("info"),
                                        $book_name = $("<a>").text(books[i].name),
                                        $author_name = $("<a>").text(author_name(authors, books[i]));
                                    $book_name.attr("id", "book_href");
                                    $info.append($book_name).append("<br>").append($author_name);
                                    $image.attr("src", books[i].image).attr("alt", books[i].name + ',' + author_name(authors, books[i]));
                                    $image_div.append($image);
                                    $book.append($image_div).append($info);
                                    $li.append($book);
                                    i++;
                                    console.log('i:' + i);
                                    if (i === books.length)
                                        break;
                                    if (j === 5) {
                                        i--;
                                    }
                                }
                            }
                            $content.append($li);
                        }
                    }
                });
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                console.log(jqXHR);
                console.log(textStatus);
                callback(error, null);
            });
        }
    });
    tabs.push({
        "name" : "Подкасты",
        "content" : function (callback) {
            var $content = $("<ul>");
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    for (var i = 0; i < books.length; i++) {
                        if (books[i].type === "podcast") {
                            var $li = $("<li>");
                            for (var j = 0; j < 6; j++) {
                                if (books[i].type === "podcast") {
                                    var $book = $("<div>").addClass("audio"),
                                        $image_div = $("<div>").addClass("image_div"),
                                        $image = $("<img>").addClass("image_audio width_200 height_200"),
                                        $info = $("<div>").addClass("info"),
                                        $book_name = $("<a>").text(books[i].name),
                                        $author_name = $("<a>").text(author_name(authors, books[i]));
                                    $book_name.attr("id", "book_href");
                                    $info.append($book_name).append("<br>").append($author_name);
                                    $image.attr("src", books[i].image).attr("alt", books[i].name + ',' + author_name(authors, books[i]));
                                    $image_div.append($image);
                                    $book.append($image_div).append($info);
                                    $li.append($book);
                                    i++;
                                    console.log('i:' + i);
                                    if (i === books.length)
                                        break;
                                    if (j === 5) {
                                        i--;
                                    }
                                }
                            }
                            $content.append($li);
                        }
                    }
                });
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                console.log(jqXHR);
                console.log(textStatus);
                callback(error, null);
            });
        }
    });
    $(document).ready(function () {
        $(".headermenu").html("");
        tabs.forEach(function (tab) {
            var $aElement = $("<a>").attr("href", ""),
                $spanElement = $("<span>").text(tab.name);
            $aElement.append($spanElement);
            $(".headermenu").append($aElement);
            $spanElement.on("click", function () {
                $(".headermenu a span").removeClass("active");
                $spanElement.addClass("active");
                $(".content").empty();
                $("#main_name").html(tab.name);
                tab.content(function (err, $content) {
                    if (err !== null) {
                        alert("Возникла ошибка при обработке запроса: " + err);
                    } else {
                        $(".content").append($content);
                    }
                });
                return false;
            });
        });
        $(".headermenu a:first span").trigger("click");
        $(".content").on("click", "#book_href", function () {
            var link = "",
                name = $(this).text(),
                image, author;
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    for (var i = 0; i < books.length; i++){
                        if (books[i].name === name) {
                            image = books[i].image;
                            author = author_name(authors, books[i]);
                            break;
                        }
                    }
                    console.log(name);
                    link += '<div class="one_book">' + 
                                '<div class="book_desc">' +
                                    '<div class="book_image">' +
                                        '<img class="main_image" src="' + image + '" alt="' + name + ',' + author + '">' + 
                                    '</div>' +
                                    '<div class="author_name">' + 
                                        '<p>' + author + '</p>' + 
                                        '<p>' + name + '</p>' + 
                                    '</div>' + 
                                '</div><br>' + 
                                '<div class="book_inf">' +
                                    '<p>Здесь будет описание книги</p>' + 
                                '</div>' +  
                            '</div>';
                    $(".content").html(link);
                    $("#main_name").html("");
                    return false;
                });
            });
        });
        $(".searchbutton").on("click", function () {
            $(".searchinput").val("");
            console.log("notFunction");
            $(".searchinput").val("Разработчики еще не заложили в меня эту функцию");
            return false;
        });
        $(".contact").on("click", function () {
            $(".information").html("");
            var link = "<p>Контактов нет</p>";
            $(".information").append(link);
            return false;
        });
        $(".about").on("click", function () {
            $(".information").html("");
            var link = "<p>Компания без опыта работы, но с большими амбициями</p>";
            $(".information").append(link);
            return false;
        });
        $(".faq").on("click", function () {
            $(".information").html("");
            var link = '<img src="./images/faq.jpg" width="50" height="50">';
            $(".information").append(link);
            return false;
        });
        $(".kek").on("click", function () {
            $(".information").html("");
            var link = 'В разработке';
            $(".information").append(link);
            return false;
        });
    });
};

$(".document").ready(main);