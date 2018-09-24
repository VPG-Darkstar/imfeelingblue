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
	"Life is 10% what happens to you and 90% how you react to it.",
	"You may not be able to change the past, but you can always change the future!",
	"Don't think \"what if things go wrong,\" think \"what if things go right.\"",
	"There is plenty of time to accomplish everything you want to.",
	"It is never too late to learn a new skill or try a new hobby!",
	"It's ok to be selfish sometimes.",
	"Don't let the bastards grind you down.",
	"A person who never made a mistake never tried anything new.",
	"It does not matter how slowly you go as long as you do not stop.",
	"Courage is resistance to fear, mastery of fear - not absence of fear.",
	"Success is not final, failure is not fatal: it is the courage to continue that counts.",
	"We must accept finite disappointment, but never lose infinite hope.",
	"Not until we are lost do we begin to understand ourselves.",
	"Never look back unless you are planning to go that way.",
	"Never confuse a single defeat with a final defeat.",
	"My only fault is that I don't realize how great I really am.",
	"Sometimes life hits you in the head with a brick. Don't lose faith."
];

//Collection of used quotes to prevent repeats
var usedQuotes = [];

//Event listener for "Play" and "Pause" button that starts a loop through all quotes
$("#play").on("click", function(){
	if(cycle){
		//Stop the cycle if user clicks pause
		$("#play").removeClass("fa-pause-circle");
		$("#play").addClass("fa-play-circle");	

		clearInterval(nIntervId);
		cycle = !cycle;
	} else {
		//Start the cycle if user clicks play
		$("#play").removeClass("fa-play-circle");
		$("#play").addClass("fa-pause-circle");

		$("#quoteDisplay").animate({"opacity": 0}, 1000, function(){
			$(this).text(generateQuote());
		}).animate({"opacity": 1}, 1000);

		nIntervId = setInterval(function(){
			$("#quoteDisplay").animate({"opacity": 0}, 1000, function(){
				$(this).text(generateQuote());
			}).animate({"opacity": 1}, 1000);
		}, 5000);	
		cycle = !cycle;
	}
});

//Event listener for random button which selects one quote randomly
$("#random").on("click", function(){
	//Stop the cycle if it is running
	$("#play").removeClass("fa-pause-circle");
	$("#play").addClass("fa-play-circle");	

	clearInterval(nIntervId);
	cycle = !cycle;

	//Display one random quote and stop
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