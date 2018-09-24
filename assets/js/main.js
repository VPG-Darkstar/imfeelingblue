//Boolean flag for if quotes should be continuously cycled through
var cycle = false;

//Interval timing for quote display time
var nIntervId;

//Collection of supportive quotes
var quoteBank = [
	"You are not alone.",
	"You can do this!",
	"The night is always the darkest before the dawn.",
	"Take a moment to breathe.",
	"Life is 10% what happens to you and 90% how you react.",
	"You may not be able to change the past, but you can always change the future!",
	"Don't think \"what if things go wrong,\" think \"what if things go right.\"",
	"There is plenty of time to accomplish everything you want to.",
	"It is never too late to learn a new skill or try a new hobby!",
	"It's ok to be selfish sometimes."
];

//Collection of used quotes to prevent repeats
var usedQuotes = [];

//Event listener for "Play" and "Pause" button that starts a loop through all quotes
$("#play").on("click", function(){
	if(cycle){
		$("#play").removeClass("fa-pause-circle");
		$("#play").addClass("fa-play-circle");	

		clearInterval(nIntervId);

		console.log("Stop printing!");
		cycle = !cycle;
	} else {
		$("#play").removeClass("fa-play-circle");
		$("#play").addClass("fa-pause-circle");

		$("#quoteDisplay").animate({"opacity": 0}, 1000, function(){
			$(this).text(generateQuote());
		}).animate({"opacity": 1}, 1000);

		nIntervId = setInterval(function(){
			$("#quoteDisplay").animate({"opacity": 0}, 1000, function(){
				$(this).text(generateQuote());
			}).animate({"opacity": 1}, 1000);

			console.log("Print quote!");
		}, 5000);	
		cycle = !cycle;
	}
});

//Event listener for random button which selects one quote randomly
$("#random").on("click", function(){
	$("#quoteDisplay").animate({"opacity": 0}, 1000, function(){
		$(this).text(generateQuote());
	}).animate({"opacity": 1}, 1000);
});

//Function to select a quote from the array
function generateQuote(){
	//Randomly choose a quote
	var quoteNum = Math.floor(Math.random() * (quoteBank.length));
	var chosen = quoteBank[quoteNum];

	//Add quotes that have already been used to a new array so that there
	//aren't any repeats
	usedQuotes.push(chosen);
	quoteBank.splice(quoteNum, 1);

	//If all quotes have been viewed, reset original array and loop again
	if(quoteBank.length < 1){
		quoteBank = usedQuotes.splice(0, usedQuotes.length);
	}

	//Return the quote
	return chosen;
}