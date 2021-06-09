var main = function () {
    var fio = function (author) {
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

    $(".document").ready(function () {
        $.getJSON("users.json", function (users) {
            $.getJSON("authors.json", function (authors) {
                $.getJSON("books.json", function (books) {
                    var $table = $("<table>").addClass("delete"),
                        $firstTR = $("<tr>"),
                        $tdName = $("<td>").text("Название"),
                        $tdAuthor = $("<td>").text("Автор"),
                        $tdDelete = $("<td>").text("Удалить");
                    $firstTR.append($tdName)
                        .append($tdAuthor)
                        .append($tdDelete);
                    $table.append($firstTR);
                    books.forEach(function (book) {
                        for (let userBook of users[0].busket) {
                            if (userBook === book._id) {
                                let author_fio = author_name(authors, book),
                                    author_id = author_authorid(authors, book),
                                    $tr = $("<tr>"),
                                    $tdName = $("<td>").text(book.name),
                                    $tdAuthor = $("<td>").text(author_fio),
                                    $tdDelete = $("<td>").attr("href", "authors/" + author_id + "/books/" + book._id).text("Удалить").addClass(".ad");
                                console.log("afio: " + author_fio);
                                console.log("aid: " + author_id);
                                console.log("book._id: " + book._id);
                                console.log("book.bookID: " + book.bookID);
                                $tdDelete.on("click", function () {
                                    $.ajax({
                                        "url" : "/users/" + users[0].email + "/" + book._id,
                                        "type" : "DELETE"
                                    }).done(function (response) {
                                        console.log(response);
                                        location.reload();
                                    }).fail(function (err) {
                                        console.log("error from delete book");
                                    });
                                    return false;
                                });
                                $tr.append($tdName)
                                    .append($tdAuthor)
                                    .append($tdDelete);
                                $table.append($tr);
                            }
                        }
                    });
                    $(".page .content").append($table);
                });
            });
        });
    });
};

$(".document").ready(function () {
    var params = window.location.pathname.split('/');
    $(".authorization").html("");
    $(".authorization").append($("<a>").attr("href", "/index.html").text("Выход"));
    $("header .container .name a").attr("href", "/users/" + params[2] + "/index.html");
    main();
});