var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// var xhr = new XMLHttpRequest();




var fs = require('fs');
var text = fs.readFileSync("TheAdventuresofSherlockHolmes.txt", 'utf8');
var myText = "I love coffee with milk and sugar. Black coffee is my favorite, \
but the others are fine too. I know I like it more than tea or milk or soda."
var myURL = "https://en.wikipedia.org/wiki/Koala"

// console.log(text);

function keywords() {
	var output = {};
	alchemyapi.keywords('url', myURL, { 'sentiment':1 }, function(response) {
		output['keywords'] = { text:text, response:JSON.stringify(response,null,4), results:response['keywords'] };
		for (var i = 0; i <response['keywords'].length; i++){
		console.log(response['keywords'][i]['text']);
		}
	});
};


keywords();




// alchemyapi.keywords("text", myText, {}, function(response){	
// 	console.log("status: " + response["status"]);
// 	console.log("keywords: " + response["keywords"]["text"]);
// 	console.log("text: " + response["text"]);
// });


// var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I love my app!";
// alchemyapi.sentiment("text", myText, {}, function(response) {
// console.log("Sentiment: " + response["docSentiment"]["type"]);
// });