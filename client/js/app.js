var main = function(bookObjects){
    "use strict"

    
    var names = bookObjects.map(function (book) {
            return book.name;
        }),
        authors = bookObjects.map(function (book) {
            return book.author;
        }),
        images = bookObjects.map(function (book) {
            return book.image;
        });
    
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
                console.log('i: ' + i);
                if (i === names.length)
                    break;
                if (j === 5) {
                    i--;
                }
            }
            link += '</li>';
        }
        link += '</ul>';
        $('.content').append(link);
    });
}

$(document).ready(function (){
    $.getJSON("books.json", function (bookObjects) {
        main(bookObjects);
    });
});