$(document).ready(function() {

	var topics = ["ballet", "soccer", "football", "baseball", "hockey", "rugby", "tennis", "golf",];

	renderButtons();
	
	function renderButtons(){
		$("#topicButtons").empty();		

		for (var i = 0; i < topics.length; i++) {

			// Generate a <button> for each item in the topics array
			var btn = $('<button>');
			// Add a class to all <button>s
			btn.addClass("btn btn-default topicBtn");
			// Add a data-attibute
			btn.attr("data-topic", topics[i]);
			// Provide initial button text
			btn.text(topics[i]);
			// Add the <button>s to our topicButtons div
			$('#topicButtons').append(btn);
		};
	};


	// $(".topicBtn").on("click", function(){
	$("#topicButtons").on("click", '.topicBtn', function(){	
		var sport = $(this).attr("data-topic");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        sport + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		console.log(sport);
		console.log(queryURL);

	// Create an AJAX call for the specific topic being clicked
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			var results = response.data;

			for (var i = 0; i < results.length; i++) {

				var topicDiv = $("<div>");

				var topicGif = $("<img>");
				topicGif.addClass("resultGif")
				topicGif.attr("src", results[i].images.fixed_width_still.url);
				topicGif.attr("data-still", results[i].images.fixed_width_still.url);
				topicGif.attr("data-animate", results[i].images.fixed_width.url);
				topicGif.attr("data-state", "still");


				var gifRating = $("<p>").text("Rating: " + results[i].rating);

				topicDiv.append(topicGif);
				topicDiv.append(gifRating);


			$("#gifHere").prepend(topicDiv);
			}

			$("img").on("click", function() {
		

		var state = $(this).attr("data-state")
		
		if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
	      } else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
      }
	});
		
		});
	});

	


	$('#addTopic').on("click", function(event) {
		event.preventDefault();

		// Grabs input from textbox
		var $newTopic = $("#topicInput").val().trim();

		// Prevent blank & repeated inputs from creating a button
		if ($('#topicInput').val() !== "") {

		// Add topic from the textbox to array
		topics.push($newTopic);

		// Call renderButtons which handles the processing of our topic array
		renderButtons();

		// Receive alert if blank textbox is submited
		} else {
			alert("Field blank. Please enter a sport");
		};

	});

	


// close $(docment).ready
});