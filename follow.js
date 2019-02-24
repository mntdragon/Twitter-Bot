// #### Contain twitter bot code

var Twitter = require('twitter');
var config = require('./config.js');

// pass configuration details into Twitter

var T = new Twitter(config);

// --- at this pont configuration all set up
// --- app details being passed into the npm module 'Twitter'
// --- time to make get and post requests to the API
// --- time to do things on twitter via the bot

// ## Build the Bot

var parameters = {
    q: '#MAMAMOO',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

// --- we have callback in the get request
T.get('search/tweets', parameters, function (error, data, response) {
    if (!error) {
        // --- array of multiple tweets data.statuses object
        for (let i = 0; i < data.statuses.length; i++) {
            // --- friendships/create requires the username of the person we want to follow
            let screen_name = data.statuses[i].user.screen_name;

            T.post('friendships/create', {screen_name}, function(error, response){
            if(error){
                console.log(error);
            } else {
                console.log(screen_name, ': **FOLLOWED**');
            }
            });
        }
    } else {
        console.log(error);
    }
});


/* THE MOST IMPORTANT PIECES:
The route, the parameters object, and the callback.

POST REQUEST TEMPLATE
T.post('route', {params}, function(err, response){
  // Test for Errors
  // If no errors, log success
});


*/