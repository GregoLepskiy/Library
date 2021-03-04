var main = function(){
    "use strict"

    var names = [
            "Капитанская дочка",
            "Преступление и наказание",
            "Сага о Ведьмаке",
            "Крестный отец",
            "Война и мир",
            "Герой нашего времени",
            "Мертвые души"
        ],
        authors = [
            "А.С. Пушкин",
            "Ф.М. Достоевский",
            "А. Сапковский",
            "М. Пьюзо",
            "Л.Н. Толстой",
            "М.Ю. Лермонтов",
            "Н.В. Гоголь"
        ],
        images = [
            "./images/aspuhkin_kapitanskaya-dochka.jpg",
            "./images/fmdostoevskiy_prestuplenie-i-nakazanie.jpg",
            "./images/asapkovskiy_saga-o-vedmake.jpg",
            "./images/mpuzo_krestniy-otets.jpg",
            "./images/lntolstoy_voina-i-mir.jpg",
            "./images/mulermontov_geroy-nashego-vremeni.jpg",
            "./images/nvgogol_mertvie-dushi.jpg"
        ];
    
    $("document").ready( function (){
        var link = '<ul>';
        for (var i = 0; i < names.length; i++){
            link += '<li>';
            for (var j = 0; j < 6; j++){
                link += '<div class="book width_220 height_350">' + 
                        '<a href="' + 'index.html' + '"><img class="image_book width_200 height_305" src="' + images[i] + '" alt="' + names[i] + ', ' + authors[i] + '"></a><br>' + 
                        '<a href="' + 'index.html' + '">' + names[i] + '</a><br>' + 
                        '<a href="' + 'index.html' + '">' + authors[i] + '</a>' + 
                        '</div>';
                i++;
                if (i === names.length)
                    break;
            }
            link += '</li>';
        }
        link += '</ul>';
        $('.content').append(link);
    });
}

$(document).ready(function (){
    console.log("document is ready");
    main();
});