/**
   Copyright 2014 AlchemyAPI

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var express = require('express');
var consolidate = require('consolidate');

var app = express();
var server = require('http').createServer(app);

//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// all environments
app.engine('dust',consolidate.dust);
app.set('views',__dirname + '/views');
app.set('view engine', 'dust');
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static('public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/keywords', keywords);
app.get('/hi', function(req, res){
  res.send('hellloooo!!');
});

app.get('/bye', function(req, res){
  res.send('byeeee!!');
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
	console.log('To view the example, point your favorite browser to: localhost: 3000'); 
});


var fs = require('fs');
var text = fs.readFileSync("TheAdventuresofSherlockHolmes.txt", 'utf8');
var myText = "I love coffee with milk and sugar. Black coffee is my favorite, \
but the others are fine too. I know I like it more than tea or milk or soda."
//var myURL = "https://en.wikipedia.org/wiki/Koala"

function keywords(req, res) {
  var keywords = [];
	//var output = {};
  var myURL = req.query.url;
  console.log(myURL);
	alchemyapi.keywords('url', myURL, { 'sentiment':1 }, function(response) {
		// output['keywords'] = { 
  //     text: text,
  //     response: JSON.stringify(response,null,4),
  //     results: response['keywords']['text']
  //   };
    console.log(response);
    for (var i = 0; i < response.keywords.length; i++){
      keywords.push(response.keywords[i].text);
    } 

	  res.send(keywords.join(', '));
   //console.log(output['keywords']['text']);
  });
	
};

//keywords();


