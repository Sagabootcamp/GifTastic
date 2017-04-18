
	var dataState;	
	
	var images = $("<img>");

	var buttonsholder = $(".button-container");

	var imgIdent;	 

	var giphyResults=[];	

	var sports = ["Soccer", "Basketball", "Football", "Baseball", "Cricket", "Tennis"];

	var button;


	$(document).on("click", ".button-class", function(){

		$(".gify-container").empty();
		var searchSport = $(this).attr("data-name");
		console.log(this);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="
					 + searchSport + "&api_key=dc6zaTOxFJmzC&limit=10";

		
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			console.log(response);

			giphyResults = response.data;

			console.log(giphyResults);
			generateGifs();	
		});	
		


	});


	function generateSportInfo() {

		var searchSport = $(this).attr("data-name");
		console.log(this);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="
					 + searchSport + "&api_key=dc6zaTOxFJmzC&limit=10";

		
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			console.log(response);

			giphyResults = response.data;

			console.log(giphyResults);
			generateGifs();	
		});	

		

	}

	function generateSportsButtons() {

		for(var j=0; j<sports.length; j++){
			button = $("<button class = 'button-class'>");
			button.attr("data-name", sports[j]);	
			button.text(sports[j]);
			buttonsholder.append(button);

		}	

	}	

	
		
	function generateGifs() {	

			//event.preventDefault();
		
			console.log(giphyResults.lenth);
			
			for(var i = 0; i< giphyResults.length; i++){
			
				var gifDiv = $("<div class = 'gifs'>");
				var images = $("<img>");
				images.attr("src", giphyResults[i].images.fixed_height_small_still.url);
				images.attr("data-state", "still");
				images.attr("ident", i);

				var rating = giphyResults[i].rating;
				var displayRating = $("<p>").text("Rating: " + rating);

				gifDiv.append(images);
				gifDiv.append(displayRating);

				$(".gify-container").prepend(gifDiv);

			};

		manageGifClicks();

	}

	function manageGifClicks() {
		
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
	}	

	$("#add-sport").on("click", function(event) {
		event.preventDefault();
		var newSport = $("#sport-input").val().trim();
		sports.push(newSport);
		button = $("<button class = 'button-class'>");
		button.attr("data-name", newSport);	
		button.text(newSport);
		buttonsholder.append(button);
	});	
	

	
	generateSportsButtons();


				





					 



