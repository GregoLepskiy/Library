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
            var $content = $("<ul>");
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
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
                                    if (j === 4) {
                                        i = books.length;
                                    }
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
                                    if (j === 4) {
                                        i = books.length;
                                    }
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
                                    if (j === 4) {
                                        i = books.length;
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
        "name" : "Книги",
        "content" : function (callback) {
            var $content = $("<ul>");
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].type === "book") {
                            let $li = $("<li>");
                            for (let j = 0; j < 6; j++) {
                                if (books[i].type === "book") {
                                    let $book = $("<div>").addClass("book width_220 height_350"),
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
        $(".searchinput").val("");
        $(".headermenu").html("");
        tabs.forEach(function (tab) {
            var $aElement = $("<a>").attr("href", ""),
                $spanElement = $("<span>").text(tab.name);
            $aElement.append($spanElement);
            $(".headermenu").append($aElement);
            $spanElement.on("click", function () {
                $(".searchinput").val("");
                $(".information").html("");
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
                                    '<p>Сделай его как описание, чтобы потом менять текст.</p>' + 
                                '</div>' +  
                            '</div>';
                    $(".content").html(link);
                    $("#main_name").html("");
                    return false;
                });
            });
        });
        function butfunc () {
            if ($(".searchinput").val() === "Ты идиот?") {
                $("body").html("Идиот");
                return;
            }
            if (($(".searchinput").val()).toLowerCase() === "тыщ") {
                $(".page").html('<iframe width="560" height="315" src="https://www.youtube.com/embed/9HBZmMvqI3Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                return;
            }
            if (($(".searchinput").val()).toLowerCase() === "твоя вишневая девятка") {
                $(".page").html('<iframe src="https://vk.com/video_ext.php?oid=-56263398&id=456286179&hash=b467a32d5f7c73fc&hd=2" width="853" height="480" frameborder="0" allowfullscreen></iframe>');
                return;
            }
            if ($(".searchinput").val() !== "" && ($(".searchinput").val()).trim().length > 0) {
                $("#main_name").html("Результаты поиска: " + $(".searchinput").val());
                $(".content").html("");
                var $content = $("<ul>");
                $.getJSON("authors.json", function (authors) {
                    $.getJSON("books.json", function (books) {
                        $content.append("<h2>Книги</h2>");
                        for (let i = 0; i < books.length; i++) {
                            if (books[i].type === "book") {
                                if(books[i].name.toLowerCase().includes($(".searchinput").val().toLowerCase()) || (author_name(authors, books[i]).includes($(".searchinput").val()))){
                                    let $li = $("<li>");
                                    for (let j = 0; j < 5; j++) {
                                        if (books[i].type === "book") {
                                            if((books[i].name.toLowerCase().includes($(".searchinput").val().toLowerCase())) || (author_name(authors, books[i]).includes($(".searchinput").val()))){
                                                let $book = $("<div>").addClass("book width_220 height_350"),
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
                                                if (j === 4) {
                                                    i--;
                                                }
                                            }
                                        }
                                    }
                                    $content.append($li);
                                }
                            }
                        }
                        $content.append("<h2>Аудиокниги</h2>");
                        for (let i = 0; i < books.length; i++) {
                            if (books[i].type === "audiobook") {
                                if(books[i].name.toLowerCase().includes($(".searchinput").val().toLowerCase()) || (author_name(authors, books[i]).includes($(".searchinput").val()))){
                                    let $li = $("<li>");
                                    for (let j = 0; j < 5; j++) {
                                        if (books[i].type === "audiobook") {
                                            if(books[i].name.toLowerCase().includes($(".searchinput").val().toLowerCase()) || (author_name(authors, books[i]).includes($(".searchinput").val()))){
                                                let $book = $("<div>").addClass("audio"),
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
                                                if (j === 4) {
                                                    i--;
                                                }
                                            }
                                        }
                                    }
                                    $content.append($li);
                                }
                            }
                        }
                        $content.append("<h2>Подкасты</h2>");
                        for (let i = 0; i < books.length; i++) {
                            if (books[i].type === "podcast") {
                                if(books[i].name.toLowerCase().includes($(".searchinput").val().toLowerCase()) || (author_name(authors, books[i]).includes($(".searchinput").val()))){
                                    let $li = $("<li>");
                                    for (let j = 0; j < 5; j++) {
                                        if (books[i].type === "podcast") {
                                            if(books[i].name.toLowerCase().includes($(".searchinput").val().toLowerCase()) || (author_name(authors, books[i]).includes($(".searchinput").val()))){
                                                let $book = $("<div>").addClass("audio"),
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
                                                if (j === 4) {
                                                    i--;
                                                }
                                            }
                                        }
                                    }
                                    $content.append($li);
                            }
                            }
                        }
                    });
                });
                $(".content").append($content);
            } else {
                $(".searchinput").val("Ты идиот?");
            }
        }
        $(".searchbutton").on("click", function () {
            butfunc();
            return false;
        });
        $(".searchinput").on("keypress", function (event) {
            if (event.keyCode === 13)
                butfunc();
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