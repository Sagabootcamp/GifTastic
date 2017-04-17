$("#add-topic").on("click", function(event) {

	event.preventDefault();

	var searchTopic = $("#topic-input").val();

	var queryURL = "http://api.giphy.com/v1/gifs/search?q="
					 + searchTopic + "&api_key=dc6zaTOxFJmzC&limit=10"; 

	var dataState;	
	
	var images = $("<img>");

	var imgIdent;		 

		

	$.ajax({

		url: queryURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);

		var giphyResults = response.data;

		
		for(var i = 0; i< giphyResults.length; i++){
		
			var gifDiv = $("<div class = 'gifs'>");
			images = $("<img>");
			images.attr("src", giphyResults[i].images.fixed_height_small_still.url);
			images.attr("data-state", "still");
			images.attr("ident", i);

			var rating = giphyResults[i].rating;
			var displayRating = $("<p>").text("Rating: " + rating);

			gifDiv.append(images);
			gifDiv.append(displayRating);

			$("#gify-container").prepend(gifDiv);
		
		}
		
		$("img").on("click", function() {	

			dataState = $(this).attr("data-state");
			imgIdent = $(this).attr("ident");
			console.log(imgIdent);
			
		    if(dataState === "still"){
			  	$(this).empty();
			  	$(this).attr("src", giphyResults[imgIdent].images.fixed_height_small.url);
			  	$(this).attr("data-state", "animate");
			  	dataState = $(this).attr("data-state");
			  	var srcc = $(this).attr("src");
			  	console.log(srcc);
			  	console.log(dataState);
		  	}
			
			else if(dataState === "animate"){
				$(this).empty();
				$(this).attr("src",giphyResults[imgIdent].images.fixed_height_small_still.url);
				$(this).attr("data-state", "still"); 
				dataState = $(this).attr("data-state");
				var srcc = $(this).attr("src");
			  	console.log(dataState);
			  	console.log(srcc);
		 	}

	 	});	
				

	});

});

//$(document).on("click", "button", function(){








/*		$(function() {
    $('a img').click(function() {
    $img=$(this).attr('src');    

    $('#div1').append("<img src="+$img+" />")

  });

});*/



					 



