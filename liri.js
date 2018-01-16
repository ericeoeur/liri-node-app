require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs"); //remember to "npm install fs" on command line
var request = require("request"); //remember to "npm install request" on command line
var twitter = require("twitter"); //remember to "npm install twitter" on command line
var spotify = require("spotify"); //remember to "npm install spotify" on command line
var liri = process.argv[2]; //This holds the first command line input
console.log("This is what was inputted: " + liri);




//add command line calls to functions here
switch (liri) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifySong(); break; 
    case "movie-this": simpleRequest(); break; 

};



function simpleRequest() {
  
    let movie = process.argv[3];
    if (!movie) {
        movie = "mr nobody";
    }
    params = movie


    request("http://www.omdbapi.com/?apikey=9a95b62e&t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {

        if (!error && response.statusCode == 200) {
            let movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal
            console.log("***********************" + movieObject.Title + "***********************" + "\r\n" +
                "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                "******************************************************************************");


        } else {
            console.log("Error :" + error);
            return;
        }
    });

};




function spotifySong () {
    console.log("Spotify ID: " + keys.Spotify.id);
   
}
   
   

   
   /* //console.log(keys.Spotify.id); 

   let spotify = {
        id: keys.Spotify.id,
        secret: keys.Spotify.secret,
    };

*/
     
    






function myTweets() {
    console.log("THIS FUCKING SUCKS");

    //Pull Twitter API keys and data
    var client = new twitter({
        consumer_key: keys.Twitter.consumer_key,
        consumer_secret: keys.Twitter.consumer_secret,
        access_token_key: keys.Twitter.access_token_key,
        access_token_secret: keys.Twitter.access_token_secret,
    });

    //Command Line input for twitter username
    let twitterUsername = process.argv[3];

    //If no username was entered default to your own twitter handle
    if (!twitterUsername) {
        twitterUsername = "ericetwice";
    }

    //Change the screen_name default (Which is ericetwice) to the one entered in the command line
    twitterHandle = {
        screen_name: twitterUsername
    };

    //Twitter API Documentation -- pulling from user_timeline. 
    // use this as reference: https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html
    client.get("statuses/user_timeline/", twitterHandle, function (error, data, response) {
        if (!error) {
            for (let i = 0; i < 20; i++) {
                let tweetCount = i+1; 
                let results =
                    data[i].text + "\r\n\r\n" +
                    "Tweeted on: " + data[i].created_at + "\r\n\r\n" +
                    "*********************** @" + data[i].user.screen_name + "'s Tweet Number: " + tweetCount + " *********************** " + "\r\n";
                console.log(results);
                //console.log(response); //this shows everything from user_timeline

            }
        } else {
            console.log("There was an error. Error code: " + error);
            return;
        }
    });

}



