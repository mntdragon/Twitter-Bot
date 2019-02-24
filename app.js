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

// -- search for Tweets
// --- q is ONLY REQUIRED parameter, store search query
// --- count for the number of tweets I want to return
// --- result_type: recent to return ONLY the most RECENT results
// --- lang: return your wish language results
var parameters = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

// --- we have callback in the get request
T.get('search/tweets', parameters, function (error, data, response) {
    if (!error) {
        // --- array of multiple tweets data.statuses object
        for (let i = 0; i < data.statuses.length; i++) {
            // --- capture the tweer id via data.statuses[i].id_str, which is NEEDED for the post request
            let id = {
                id: data.statuses[i].id_str
            }
            // --- favorite each one individually
            T.post('favorites/create', id, function (error, response) {
                if (error) {
                    console.log(error[0].message);
                }
                // --- log the tweet url
                else {
                    let username = response.user.screeen_name;
                    let tweetID = response.id_str;
                    // --- see which tweets the bot has favorited
                    console.log('Favorite: ', 'https://twitter.com/${username}/status/${tweetID}')
                }
            });
        }
    } else {
        console.log(error);
    }
})