/*
* Author: Mahmoud Eid.
* Description: Random quotes script.
* Browsers the project was checked: Google Chrome, Mozilla Firefox, Safari.
*/

// event listener to respond to "Show another quote" button clicks.
// when user clicks anywhere on the button, the "printQuote" function is called.
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var timeOut;

/*
* This function used for get random quote.
* Add displayCount property in every quote object.
* Sort quotes ASC by displayCount.
* And finally return random quote.
*/
function getRandomQuote() {
	var randomNumber = Math.floor(Math.random() * quotes.length);
	var randomQuote = quotes[randomNumber];
	var viewsCounts = [];

	// Add displayCount property in every quote object.
	for (var i = 0; i < quotes.length; i += 1) {
		if(!quotes[i].displayCount){
			quotes[i].displayCount = 0;
		}
		viewsCounts.push(quotes[i].displayCount);
	}
	// sort views counts ASC
	viewsCounts.sort(function(a, b){return a - b;});

	// Loop through ASC sorted quotes
	for (i = 0; i < quotes.length; i += 1) {
		// if total of all quotes not equal 0, randomQuote variable equal first quote,
		// which it's display count is less than other quotes.
		if(quotes[i].displayCount === viewsCounts[0] && viewsCounts.reduce(getSum) !== 0) {
			randomQuote = quotes[i];
		}
	}
	return randomQuote;
}

/*
* This function used for print Quote in web page.
* Also increase quote display count.
* Call refreshQoute function to return next Quote.
* And finally call changePageBackground function.
*/
function printQuote() {
	// Clear Timeout
	clearTimeout(timeOut);

	var quoteBox = document.getElementById("quote-box");
	var randomQuote = getRandomQuote();
	var quoteContent = '';

	randomQuote.displayCount += 1 ;
    quoteContent += '<p class="quote">' + randomQuote.quote +'</p>';
    quoteContent += '<p class="source">' + randomQuote.source;
    if(randomQuote.citation) {
    	quoteContent += '<span class="citation">'+ randomQuote.citation +'</span>';
    }
    if(randomQuote.year) {
    	quoteContent += '<span class="year">'+ randomQuote.year +'</span>';
    }
    quoteContent += '</p>';
    if(randomQuote.tags){
    	quoteContent += '<p class="tags">Tags: ' + randomQuote.tags +'</p>';
    }
    quoteBox.innerHTML = quoteContent;
    
    // Refresh Quote every 30 sec
   	refreshQuote();
    changePageBackground();
}

/*
* This function used for auto refresh Quote.
* By calling printQuote function every 30 Sec.
*/
function refreshQuote() {
    timeOut = window.setTimeout(printQuote, 3000);
}

/*
* This function used for change page background.
* By create random rgb color used for changing body and loadQuote button background.
*/
function changePageBackground() {
	var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	document.body.style.backgroundColor = color;
	document.getElementById("loadQuote").style.backgroundColor = color;
}

/*
* Helper function.
* sum of arrays.
*/
function getSum(total, num) {
    return total + num;
}

// Call printQuote function.
printQuote();