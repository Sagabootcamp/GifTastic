//  Initial array of movies.
var topics = ["Halloween", "Friday the 13th", "Nightmare on Elm Street", "Hellraiser", "Exorcist", "The Fog", "Alien", "Saw", "The Amityville Horror", "Jaws", "Child's Play", "CHUD", "The Texas Chainsaw Massacre"];
var userIn;

//  Create initial set of buttons.
//  The "data-name" attribute is set to the title of the movie, to be entered into the API search query.
for (var x = 0; x < topics.length; x++) {
    var buttonDiv =$("<div>");
    var title = topics[x];
    var buttons = $("<button>");
    buttons.text(title);
    buttons.attr("data-name", title);
    buttonDiv.append(buttons);
    $("#buttons-appear-here").append(buttonDiv);
}

//  When the submit button is clicked, add a button for the user created search term.
$('#addButton').on("click", function() {
    userIn = $('#text-input').val();
    buttonDiv =$("<div>");
    buttons = $("<button>");
    buttons.text(userIn);
    buttons.attr("data-name", userIn);
    buttonDiv.append(buttons);
    $("#buttons-appear-here").append(buttonDiv);
    $('#text-input').val("");
    topics.push(userIn);
});

// When a button is clicked, 10 images from that movie will be displayed on the screen, along with the rating.
$(document).on("click", "button", function() {
    document.getElementById("gifs").innerHTML = "";
    var movie = $(this).attr("data-name");
    var queryURL = "//api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var results = response.data; 
        for (var i = 0; i < results.length; i++) {    
            var movieStill = [];              
            movieDiv = $("<div>");
            var Rating = results[i].rating;
            var p = $("<p>").text("Rating: " + Rating);
            movieStill[i] = $("<img>");
            movieStill[i].attr("src", results[i].images.fixed_height_small_still.url);
            movieStill[i].attr("id", i);
            movieDiv.append(movieStill[i]);
            movieDiv.append(p);
            $("#gifs").prepend(movieDiv);
        }        
        //  When an image / gif is clicked, change from the current format to the other.
        $("img").on("click", function() {
            var source = $(this).attr("src");
            var ident = $(this).attr("id");
            if (source === results[ident].images.fixed_height_small_still.url) {
                $(this).attr("src", results[ident].images.fixed_height_small.url);
            } else {
                $(this).attr("src", results[ident].images.fixed_height_small_still.url);
            }
        });
    });
}); 