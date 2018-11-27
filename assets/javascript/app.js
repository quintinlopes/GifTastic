var citiesArray = ["Toronto", "Washington", "London", "Paris", "Barcelona"];

$(document).ready(function() {
    for (var i = 0; i < citiesArray.length; i++) {
        $("#city-buttons").append("<button type='button' onclick='searchGif(\"" + citiesArray[i] + "\")' class='btn btn-dark' value=' " + citiesArray[i] + "'> " + citiesArray[i] + " </button>");
    }
});

function cityButtonClicked() {
    var userInput = $('#city-input').val();
    searchGif(userInput);
}

$("#add-city").on("click", function(cityBtnAdd){
    cityBtnAdd.preventDefault();
    var city = $("#city-input").val().trim();
    citiesArray.push(city);

    cityButtonClicked();
});

function cityButtonClicked() {
    var userInput = $('#city-input').val();

    if (userInput) {
        $('#city-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-dark' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

cityButtonClicked();

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=6BCmXxdHBKa3r9Wc6S5EwNweIO0cAVTW',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#gif-dump').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:350px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#gif-dump').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}