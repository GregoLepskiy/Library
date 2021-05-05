var main = function () {
    "use strict"

    $(document).ready(function () {
        function authFunc () {
            if ($(".log .login").val() === "Nutella" && $(".pass .login").val() === "это горiховое пюре") {
                $(location).attr("href", "admin.html");
                console.log("Переход на страницу администратора");
            }
            return;
        }
        $(".but .enter").on("click", function () {
            authFunc();
            return false;
        });
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