var main = function () {
    "use strict"

    $(document).ready(function () {
        $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
        $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
        $(".menu > ul").before("<span class=\"menu-mobile\">Меню:</span>");
        $(".menu > ul > li").hover(function(e) {
            if ($(window).width() > 768) {
                $(this).children("ul").stop(true, false).fadeToggle(150);
                e.preventDefault();
            }
        });
        $(".menu > ul > li").click(function() {
            if ($(window).width() <= 768) {
                $(this).children("ul").fadeToggle(150);
            }
        });
        $(".menu-mobile").click(function(e) {
            $(".menu > ul").toggleClass('show-on-mobile');
            e.preventDefault();
        });

        var accept_but = function (method) {
            let surname = $(".surname_i").val(),
                name = $(".name_i").val(),
                patr = $(".patr_i").val(),
                red = $(".red_i").val(),
                newCreation;
            if (help_val(surname) && help_val(name) && help_val(red))
                switch(method) {
                    case "author":
                        if (!help_val(patr)) patr = "-";
                        newCreation = ({"surname" : surname,
                                    "name" : name,
                                    "patronymic" : patr,
                                    "authorID" : red});
                        $.post("authors", newCreation, function (result) {
                            console.log(result);
                        });
                        break;
                    case "book":
                        let bookid = $(".bookid_i").val(),
                            authorid = $(".authorid_i").val();
                        if (help_val(bookid) && help_val(authorid) && help_val(patr)) {
                            newCreation = ({"bookID" : bookid,
                                            "name" : surname,
                                            "type" : name,
                                            "description" : patr,
                                            "picture" : red,
                                            "authorID" : authorid});
                            $.post("authors/" + authorid + "/books", newCreation, function (result) {
                                console.log(result);
                            });
                            $(".bookid_i").val("");
                            $(".authorid_i").val("");
                        }
                        break;
                    case "user":
                        if (!help_val(patr)) patr = "-";
                        newCreation = ({"surname" : surname,
                                    "name" : name,
                                    "patronymic" : patr,
                                    "email" : red});
                        $.post("users", newCreation, function (result) {
                            console.log(result);
                        });
                        break;
                    default:
                        return false;
                }
            $(".surname_i").val("");
            $(".name_i").val("");
            $(".patr_i").val("");
            $(".red_i").val("");
            return false;
        },
        help_val = function (word) {
            return (word !== "" && word.trim() !== "");
        },
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
            let res = "";
            for (let aut of authors)
                for (let autId of book.authorID){
                    if (aut._id === autId) {
                        console.log(fio(aut));
                        res = fio(aut);
                    }
                }
            return res;
        },
        author_authorid = function (authors, book){
            let res = "";
            for (let aut of authors)
                for (let autId of book.authorID){
                    if (aut._id === autId) {
                        console.log(aut.authorID);
                        res = aut.authorID;
                    }
                }
            return res;
        };

        $(".authors .add").on("click", function () {
            let $addition = $('<div>').addClass("addition"),
                $surname_w = $('<a>').addClass("surname_w").text("Фамилия"),
                $surname_i = $('<input>').addClass("surname_i"),
                $name_w = $('<a>').addClass("name_w").text("Имя"),
                $name_i = $('<input>').addClass("name_i"),
                $patr_w = $('<a>').addClass("patr_w").text("Отчество"),
                $patr_i = $('<input>').addClass("patr_i"),
                $red_w = $('<a>').addClass("red_w").text("Сокращение"),
                $red_i = $('<input>').addClass("red_i"),
                $names = $('<div>').addClass("names"),
                $fields = $('<div>').addClass("fields"),
                $desc = $('<div>').addClass("description"),
                $button = $('<div>').addClass("button"),
                $accept_b = $('<button>').addClass("accept but_st").text("Принять");
            $(".page .content").html("");
            $accept_b.click(function() {
                accept_but("author");
            });
            $names.append($surname_w).append($name_w).append($patr_w).append($red_w);
            $fields.append($surname_i).append($name_i).append($patr_i).append($red_i);
            $button.append($accept_b);
            $desc.append($names).append($fields);
            $addition.append($desc).append($button);
            $(".page .content").append($addition);
        });
        $(".authors .delete").on("click", function () {
            $(".page .content").html("");
            $.getJSON("authors.json", function (authors) {
                var $table = $("<table>").addClass("delete"),
                    $firstTR = $("<tr>"),
                    $tdSurname = $("<td>").text("Фамилия"),
                    $tdName = $("<td>").text("Имя"),
                    $tdPatr = $("<td>").text("Отчество"),
                    $tdRed = $("<td>").text("Сокращение"),
                    $tdDelete = $("<td>").text("Удалить");
                $firstTR.append($tdSurname)
                        .append($tdName)
                        .append($tdPatr)
                        .append($tdRed)
                        .append($tdDelete);
                $table.append($firstTR);
                authors.forEach(function (author) {
                    let $tr = $("<tr>"),
                        $tdSurname = $("<td>").text(author.surname),
                        $tdName = $("<td>").text(author.name),
                        $tdPatr = $("<td>").text(author.patronymic),
                        $tdRed = $("<td>").text(author.authorID),
                        $tdDelete = $("<td>").attr("href", "authors/" + author._id).text("Удалить").addClass(".ad");
                    console.log("author._id : " + author._id);
                    console.log("author.authorID : " + author.authorID);
                    $tdDelete.on("click", function () {
                        $.ajax({
                            "url" : "/authors/" + author._id,
                            "type" : "DELETE"
                        }).done(function (response) {
                            console.log(response);
                            $(".authors .delete").trigger("click");
                        }).fail(function (err) {
                            console.log("error from delete author");
                        });
                        return false;
                    });
                    $tr.append($tdSurname)
                        .append($tdName)
                        .append($tdPatr)
                        .append($tdRed)
                        .append($tdDelete);
                    $table.append($tr);
                });
                $(".page .content").append($table);
            });
        });
        $(".authors .change").on("click", function () {
            $(".page .content").html("");
            $.getJSON("authors.json", function (authors) {
                var $table = $("<table>").addClass("delete"),
                    $firstTR = $("<tr>"),
                    $tdSurname = $("<td>").text("Фамилия"),
                    $tdName = $("<td>").text("Имя"),
                    $tdPatr = $("<td>").text("Отчество"),
                    $tdRed = $("<td>").text("Сокращение"),
                    $tdDelete = $("<td>").text("Редактировать");
                $firstTR.append($tdSurname)
                        .append($tdName)
                        .append($tdPatr)
                        .append($tdRed)
                        .append($tdDelete);
                $table.append($firstTR);
                authors.forEach(function (author) {
                    let $tr = $("<tr>"),
                        $tdSurname = $("<td>").text(author.surname),
                        $tdName = $("<td>").text(author.name),
                        $tdPatr = $("<td>").text(author.patronymic),
                        $tdRed = $("<td>").text(author.authorID),
                        $tdDelete = $("<td>").attr("href", "authors/" + author._id).text("Редактировать").addClass(".ad");
                    console.log("author._id : " + author._id);
                    console.log("author.authorID : " + author.authorID);
                    $tdDelete.on("click", function () {
                        let $addition = $('<div>').addClass("addition"),
                            $surname_w = $('<a>').addClass("surname_w").text("Фамилия"),
                            $surname_i = $('<input>').addClass("surname_i").val(author.surname),
                            $name_w = $('<a>').addClass("name_w").text("Имя"),
                            $name_i = $('<input>').addClass("name_i").val(author.name),
                            $patr_w = $('<a>').addClass("patr_w").text("Отчество"),
                            $patr_i = $('<input>').addClass("patr_i").val(author.patronymic),
                            $names = $('<div>').addClass("names"),
                            $fields = $('<div>').addClass("fields"),
                            $desc = $('<div>').addClass("description"),
                            $button = $('<div>').addClass("button"),
                            $accept_b = $('<button>').addClass("accept but_st").text("Принять");
                        $accept_b.click(function() {
                            let surname = $(".surname_i").val(),
                                name = $(".name_i").val(),
                                patr = $(".patr_i").val();
                            if (help_val(surname) && help_val(name)) {
                                if (!help_val(patr)) patr = "-";
                                $.ajax({
                                    url : "/authors/" + author.authorID,
                                    type : "PUT",
                                    data : {"surname" : surname,
                                            "name" : name,
                                            "patronymic" : patr}
                                }).done(function (response) {
                                    console.log(response);
                                    $(".authors .change").trigger("click");
                                }).fail(function (err) {
                                    console.log("error from update author");
                                });
                            }
                            return false;
                        });
                        $names.append($surname_w).append($name_w).append($patr_w);
                        $fields.append($surname_i).append($name_i).append($patr_i);
                        $button.append($accept_b);
                        $desc.append($names).append($fields);
                        $addition.append($desc).append($button);
                        $(".page .content").append($addition);
                    });
                    $tr.append($tdSurname)
                        .append($tdName)
                        .append($tdPatr)
                        .append($tdRed)
                        .append($tdDelete);
                    $table.append($tr);
                });
                $(".page .content").append($table);
            });
        });


        $(".books .add").on("click", function () {
            let $addition = $('<div>').addClass("addition"),
                $surname_w = $('<a>').addClass("surname_w").text("Название"),
                $surname_i = $('<input>').addClass("surname_i"),
                $name_w = $('<a>').addClass("name_w").text("Тип"),
                $name_i = $('<input>').addClass("name_i"),
                $patr_w = $('<a>').addClass("patr_w").text("Описание"),
                $patr_i = $('<input>').addClass("patr_i"),
                $red_w = $('<a>').addClass("red_w").text("Путь к обложке"),
                $red_i = $('<input>').addClass("red_i"),
                $bookid_w = $('<a>').addClass("bookid_w").text("Сокращение книги"),
                $bookid_i = $('<input>').addClass("bookid_i"),
                $authorid_w = $('<a>').addClass("authorid_w").text("Сокращение автора"),
                $authorid_i = $('<input>').addClass("authorid_i"),
                $names = $('<div>').addClass("names"),
                $fields = $('<div>').addClass("fields"),
                $desc = $('<div>').addClass("description"),
                $button = $('<div>').addClass("button"),
                $accept_b = $('<button>').addClass("accept").text("Принять");
            $(".page .content").html("");
            $accept_b.click(function() {
                accept_but("book");
            });
            $names.append($surname_w).append($name_w).append($patr_w).append($red_w).append($bookid_w).append($authorid_w);
            $fields.append($surname_i).append($name_i).append($patr_i).append($red_i).append($bookid_i).append($authorid_i);
            $button.append($accept_b);
            $desc.append($names).append($fields);
            $addition.append($desc).append($button);
            $(".page .content").append($addition);
        });
        $(".books .delete").on("click", function () {
            $(".page .content").html("");
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    var $table = $("<table>").addClass("delete"),
                        $firstTR = $("<tr>"),
                        $tdName = $("<td>").text("Название"),
                        $tdAuthor = $("<td>").text("Автор"),
                        $tdType = $("<td>").text("Тип"),
                        $tdRed = $("<td>").text("Сокращение"),
                        $tdDelete = $("<td>").text("Удалить");
                    $firstTR.append($tdName)
                        .append($tdAuthor)
                        .append($tdType)
                        .append($tdRed)
                        .append($tdDelete);
                    $table.append($firstTR);
                    books.forEach(function (book) {
                        let author_fio = author_name(authors, book),
                            author_id = author_authorid(authors, book),
                            $tr = $("<tr>"),
                            $tdName = $("<td>").text(book.name),
                            $tdAuthor = $("<td>").text(author_fio),
                            $tdType = $("<td>").text(book.type),
                            $tdRed = $("<td>").text(book.bookID),
                            $tdDelete = $("<td>").attr("href", "authors/" + author_id + "/books/" + book._id).text("Удалить").addClass(".ad");
                        console.log("afio: " + author_fio);
                        console.log("aid: " + author_id);
                        console.log("book._id: " + book._id);
                        console.log("book.bookID: " + book.bookID);
                        $tdDelete.on("click", function () {
                            $.ajax({
                                "url" : "authors/" + author_id + "/books/" + book._id,
                                "type" : "DELETE"
                            }).done(function (response) {
                                console.log(response);
                                $(".books .delete").trigger("click");
                            }).fail(function (err) {
                                console.log("error from delete book");
                            });
                            return false;
                        });
                        $tr.append($tdName)
                            .append($tdAuthor)
                            .append($tdType)
                            .append($tdRed)
                            .append($tdDelete);
                        $table.append($tr);
                    });
                    $(".page .content").append($table);
                });
            });
        });
        $(".books .change").on("click", function () {
            $(".page .content").html("");
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    var $table = $("<table>").addClass("delete"),
                        $firstTR = $("<tr>"),
                        $tdName = $("<td>").text("Название"),
                        $tdAuthor = $("<td>").text("Автор"),
                        $tdType = $("<td>").text("Тип"),
                        $tdRed = $("<td>").text("Сокращение"),
                        $tdDelete = $("<td>").text("Редактировать");
                    $firstTR.append($tdName)
                        .append($tdAuthor)
                        .append($tdType)
                        .append($tdRed)
                        .append($tdDelete);
                    $table.append($firstTR);
                    books.forEach(function (book) {
                        let author_fio = author_name(authors, book),
                            author_id = author_authorid(authors, book),
                            $tr = $("<tr>"),
                            $tdName = $("<td>").text(book.name),
                            $tdAuthor = $("<td>").text(author_fio),
                            $tdType = $("<td>").text(book.type),
                            $tdRed = $("<td>").text(book.bookID),
                            $tdDelete = $("<td>").attr("href", "authors/" + author_id + "/books/" + book._id).text("Редактировать").addClass(".ad");
                        console.log("afio: " + author_fio);
                        console.log("aid: " + author_id);
                        console.log("book._id: " + book._id);
                        console.log("book.bookID: " + book.bookID);
                        $tdDelete.on("click", function () {
                            let $addition = $('<div>').addClass("addition"),
                                $surname_w = $('<a>').addClass("surname_w").text("Название"),
                                $surname_i = $('<input>').addClass("surname_i").val(book.name),
                                $name_w = $('<a>').addClass("name_w").text("Тип"),
                                $name_i = $('<input>').addClass("name_i").val(book.type),
                                $patr_w = $('<a>').addClass("patr_w").text("Описание"),
                                $patr_i = $('<input>').addClass("patr_i").val(book.description),
                                $red_w = $('<a>').addClass("red_w").text("Путь к обложке"),
                                $red_i = $('<input>').addClass("red_i").val(book.picture),
                                $names = $('<div>').addClass("names"),
                                $fields = $('<div>').addClass("fields"),
                                $desc = $('<div>').addClass("description"),
                                $button = $('<div>').addClass("button"),
                                $accept_b = $('<button>').addClass("accept").text("Принять");
                            $accept_b.click(function() {
                                let name = $(".surname_i").val(),
                                    type = $(".name_i").val(),
                                    description = $(".patr_i").val(),
                                    pic = $(".red_i").val();
                                if (help_val(name) && help_val(type) && help_val(description) && help_val(pic)) { 
                                    $.ajax({
                                        url : "authors/" + author_id + "/books/" + book._id,
                                        type : "PUT",
                                        data : {"name" : name,
                                                "type" : type,
                                                "picture" : pic,
                                                "description" : description}
                                    }).done(function (response) {
                                        console.log(response);
                                        $(".books .change").trigger("click");
                                    }).fail(function (err) {
                                        console.log("error from update book");
                                    });
                                }
                            });
                            $names.append($surname_w).append($name_w).append($patr_w).append($red_w);
                            $fields.append($surname_i).append($name_i).append($patr_i).append($red_i);
                            $button.append($accept_b);
                            $desc.append($names).append($fields);
                            $addition.append($desc).append($button);
                            $(".page .content").append($addition);
                            return false;
                        });
                        $tr.append($tdName)
                            .append($tdAuthor)
                            .append($tdType)
                            .append($tdRed)
                            .append($tdDelete);
                        $table.append($tr);
                    });
                    $(".page .content").append($table);
                });
            });
        });

        

        $(".users .add").on("click", function () {
            let $addition = $('<div>').addClass("addition"),
                $surname_w = $('<a>').addClass("surname_w").text("Фамилия"),
                $surname_i = $('<input>').addClass("surname_i"),
                $name_w = $('<a>').addClass("name_w").text("Имя"),
                $name_i = $('<input>').addClass("name_i"),
                $patr_w = $('<a>').addClass("patr_w").text("Отчество"),
                $patr_i = $('<input>').addClass("patr_i"),
                $red_w = $('<a>').addClass("red_w").text("Электронная почта"),
                $red_i = $('<input>').addClass("red_i"),
                $names = $('<div>').addClass("names"),
                $fields = $('<div>').addClass("fields"),
                $desc = $('<div>').addClass("description"),
                $button = $('<div>').addClass("button"),
                $accept_b = $('<button>').addClass("accept").text("Принять");
            $(".page .content").html("");
            $accept_b.click(function() {
                accept_but("user");
            });
            $names.append($surname_w).append($name_w).append($patr_w).append($red_w);
            $fields.append($surname_i).append($name_i).append($patr_i).append($red_i);
            $button.append($accept_b);
            $desc.append($names).append($fields);
            $addition.append($desc).append($button);
            $(".page .content").append($addition);
        });
        $(".users .delete").on("click", function () {
            $(".page .content").html("");
            $.getJSON("users.json", function (users) {
                var $table = $("<table>").addClass("delete"),
                    $firstTR = $("<tr>"),
                    $tdSurname = $("<td>").text("Фамилия"),
                    $tdName = $("<td>").text("Имя"),
                    $tdPatr = $("<td>").text("Отчество"),
                    $tdRed = $("<td>").text("eMail"),
                    $tdDelete = $("<td>").text("Удалить");
                $firstTR.append($tdSurname)
                        .append($tdName)
                        .append($tdPatr)
                        .append($tdRed)
                        .append($tdDelete);
                $table.append($firstTR);
                users.forEach(function (user) {
                    let $tr = $("<tr>"),
                        $tdSurname = $("<td>").text(user.surname),
                        $tdName = $("<td>").text(user.name),
                        $tdPatr = $("<td>").text(user.patronymic),
                        $tdRed = $("<td>").text(user.email),
                        $tdDelete = $("<td>").attr("href", "users/" + user.email).text("Удалить").addClass(".ad");
                    console.log("user._id : " + user._id);
                    console.log("user.email : " + user.email);
                    $tdDelete.on("click", function () {
                        $.ajax({
                            "url" : "/users/" + user.email,
                            "type" : "DELETE"
                        }).done(function (response) {
                            console.log(response);
                            $(".users .delete").trigger("click");
                        }).fail(function (err) {
                            console.log("error from delete user");
                        });
                        return false;
                    });
                    $tr.append($tdSurname)
                        .append($tdName)
                        .append($tdPatr)
                        .append($tdRed)
                        .append($tdDelete);
                    $table.append($tr);
                });
                $(".page .content").append($table);
            });
        });
        $(".users .change").on("click", function () {
            $(".page .content").html("");
            $.getJSON("users.json", function (users) {
                var $table = $("<table>").addClass("delete"),
                    $firstTR = $("<tr>"),
                    $tdSurname = $("<td>").text("Фамилия"),
                    $tdName = $("<td>").text("Имя"),
                    $tdPatr = $("<td>").text("Отчество"),
                    $tdRed = $("<td>").text("eMail"),
                    $tdDelete = $("<td>").text("Редактировать");
                $firstTR.append($tdSurname)
                        .append($tdName)
                        .append($tdPatr)
                        .append($tdRed)
                        .append($tdDelete);
                $table.append($firstTR);
                users.forEach(function (user) {
                    let $tr = $("<tr>"),
                        $tdSurname = $("<td>").text(user.surname),
                        $tdName = $("<td>").text(user.name),
                        $tdPatr = $("<td>").text(user.patronymic),
                        $tdRed = $("<td>").text(user.email),
                        $tdDelete = $("<td>").attr("href", "users/" + user.email).text("Редактировать").addClass(".ad");
                    console.log("user._id : " + user._id);
                    console.log("user.email : " + user.email);
                    $tdDelete.on("click", function () {
                        let $addition = $('<div>').addClass("addition"),
                            $surname_w = $('<a>').addClass("surname_w").text("Фамилия"),
                            $surname_i = $('<input>').addClass("surname_i").val(user.surname),
                            $name_w = $('<a>').addClass("name_w").text("Имя"),
                            $name_i = $('<input>').addClass("name_i").val(user.name),
                            $patr_w = $('<a>').addClass("patr_w").text("Отчество"),
                            $patr_i = $('<input>').addClass("patr_i").val(user.patronymic),
                            $names = $('<div>').addClass("names"),
                            $fields = $('<div>').addClass("fields"),
                            $desc = $('<div>').addClass("description"),
                            $button = $('<div>').addClass("button"),
                            $accept_b = $('<button>').addClass("accept but_st").text("Принять");
                        $accept_b.click(function() {
                            let surname = $(".surname_i").val(),
                                name = $(".name_i").val(),
                                patr = $(".patr_i").val();
                            if (help_val(surname) && help_val(name)) {
                                if (!help_val(patr)) patr = "-";
                                $.ajax({
                                    url : "/users/" + user.email,
                                    type : "PUT",
                                    data : {"surname" : surname,
                                            "name" : name,
                                            "patronymic" : patr}
                                }).done(function (response) {
                                    console.log(response);
                                    $(".users .change").trigger("click");
                                }).fail(function (err) {
                                    console.log("error from update user");
                                });
                            }
                            return false;
                        });
                        $names.append($surname_w).append($name_w).append($patr_w);
                        $fields.append($surname_i).append($name_i).append($patr_i);
                        $button.append($accept_b);
                        $desc.append($names).append($fields);
                        $addition.append($desc).append($button);
                        $(".page .content").append($addition);
                    });
                    $tr.append($tdSurname)
                        .append($tdName)
                        .append($tdPatr)
                        .append($tdRed)
                        .append($tdDelete);
                    $table.append($tr);
                });
                $(".page .content").append($table);
            });
        });
    });
};

$("document").ready(main);