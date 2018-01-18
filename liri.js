require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs"); //remember to "npm install fs" on command line
var request = require("request"); //remember to "npm install request" on command line
var twitter = require("twitter"); //remember to "npm install twitter" on command line
var spotify = require("spotify"); //remember to "npm install spotify" on command line
var Spotify = require('node-spotify-api');
var liri = process.argv[2]; //This holds the first command line input
let userINPUT = process.argv[3]; //this holds the second command line input
let space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";


//add command line calls to functions here
switch (liri) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifySong(); break;
    case "movie-this": simpleRequest(); break;
    case "do-what-it-says": hazLo(); break;
};


//this function pulls the text in random.txt and executes the information found there
function hazLo() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("Error occurred" + error);
        } else {

            results = data.split(",");

            let command;
            let parameter;

            command = results[0];
            parameter = results[1];

            parameter = parameter.replace('"', '');
            parameter = parameter.replace('"', '');
            //console.log("PARAMETER" + parameter);

            switch (command) {
                case 'my-tweets':
                    userINPUT = parameter;
                    myTweets(results[1]);
                    break;

                case 'spotify-this-song':
                    userINPUT = parameter;
                    spotifySong();
                    break;

                case 'movie-this':
                    userINPUT = parameter;
                    simpleRequest();
                    break;
            }
        }
    });
};

//this function finds the movie and gets its OMDB information displayed
function simpleRequest(results) {
    let movie = userINPUT;

    if (!movie) {
        movie = "mr nobody";
    }
    params = movie

    request("http://www.omdbapi.com/?apikey=9a95b62e&t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {

        if (!error && response.statusCode == 200) {
            let movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal

            let output = "************************" + movieObject.Title + "************************" + "\r\n" +
            space + "Title: " + movieObject.Title + "\r\n" +
            space + "Year: " + movieObject.Year + "\r\n" +
            space +   "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
            space +  "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
            space +  "Country: " + movieObject.Country + "\r\n" +
            space +   "Language: " + movieObject.Language + "\r\n" +
            space +  "Plot: " + movieObject.Plot + "\r\n" +
            space +  "Actors: " + movieObject.Actors + "\r\n" +
                "**********************************************************************" + space;

            console.log(output);

            fs.appendFile("log.txt", output, function (err) {
                if (err) throw err;
            });

        } else {
            console.log("Error :" + error);
            return;
        }
    });

};


//This function displays information about a song found on spotify
function spotifySong() {

    let spotify = new Spotify({
        id: "0b69126503894401b9000caef1c6e58b",
        secret: "f282337b81514df4ac49a20cb6d4fbb2",
    });

    let songName = userINPUT;
    let space = "\n" + "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
    if (!songName) {
        songName = "What's my age again";
    }

    params = songName;
    spotify.search({ type: 'track', query: params }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
            output = "**********************************************************************" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n"
                +  "**********************************************************************";
            console.log(output);

            fs.appendFile("log.txt", output, function (err) {
                if (err) throw err;
            });
        };
    });

}



//this function pulls the latest 20 tweets of any public account 
function myTweets(results) {
    //console.log("Check results within myTweets Function: " + results);
    //console.log("Are my keys working? " + keys.twitter);


    //Pull Twitter API keys and data
    var client = new twitter({
        consumer_key: keys.Twitter.consumer_key,
        consumer_secret: keys.Twitter.consumer_secret,
        access_token_key: keys.Twitter.access_token_key,
        access_token_secret: keys.Twitter.access_token_secret,
    });

    //Command Line input for twitter username
    let twitterUsername = userINPUT;

    //If no username was entered default to your own twitter handle
    if ((twitterUsername == 'undefined') && (results == 'undefined')) {
        twitterUsername = "ericetwice";
    } else if (results !== 'undefined') {
        twitterUsername = userINPUT;
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
                let tweetCount = i + 1;
                let results =
                    "*********************** @" + data[i].user.screen_name + "'s Tweet Number: " + tweetCount + " *********************** " + "\r\n" +
                    space +  data[i].text + "\r\n" +
                    space +  "Tweeted on: " + data[i].created_at + "\r\n\r\n";
                console.log(results);

                fs.appendFile("log.txt", results, function (err) {
                    if (err) throw err;
                });

            }
        } else {
            console.log("There was an error. Error code: " + error);
            return;
        }
    });

}



