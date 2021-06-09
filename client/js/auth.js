var main = function () {
    "use strict"

    $(document).ready(function () {
        function authFunc () {
            if ($(".log .login").val() === "Nutella" && $(".pass .login").val() === "это горiховое пюре") {
                $(location).attr("href", "/admin.html");
                console.log("Переход на страницу администратора");
                return false;
            }
            $.getJSON("users.json", function (users) {
                var $logIN = $(".log .login").val(),
                    check = false;
                for (let user of users) {
                    if ($logIN === user.email) {
                        $(location).attr("href", "/users/" + $logIN);
                        check = true;
                    }
                }
                if (!check) {
                    alert("Данного пользователя не существует!");
                }
            });
        }

        function help_val (word) {
            return (word !== "" && word.trim() !== "");
        }

        function regFunc () {
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
            $(".soder").html("");
            $accept_b.click(function() {
                let surname = $(".surname_i").val(),
                    name = $(".name_i").val(),
                    patr = $(".patr_i").val(),
                    red = $(".red_i").val(),
                    newCreation;
                if (help_val(surname) && help_val(name) && help_val(red)) {
                    if (!help_val(patr)) patr = "-";
                    newCreation = ({"surname" : surname,
                                "name" : name,
                                "patronymic" : patr,
                                "email" : red});
                    $.post("users", newCreation, function (result) {
                        console.log(result);
                        $(location).attr("href", "/users/" + red);
                    });
                }
            });
            $names.append($surname_w).append($name_w).append($patr_w).append($red_w);
            $fields.append($surname_i).append($name_i).append($patr_i).append($red_i);
            $button.append($accept_b);
            $desc.append($names).append($fields);
            $addition.append($desc).append($button);
            $(".soder").append($addition);
            return false;
        }

        $(".but .regis").on("click", function () {
            regFunc();
            return false;
        });

        $(".but .enter").on("click", function () {
            authFunc();
            return false;
        });
        $("title").text("Вход");
        $(".login").on("keypress", function (event) {
            if (event.keyCode === 13){
                authFunc();
                return false;
            }
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

$("document").ready(main);