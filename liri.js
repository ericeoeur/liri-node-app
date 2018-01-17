require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs"); //remember to "npm install fs" on command line
var request = require("request"); //remember to "npm install request" on command line
var twitter = require("twitter"); //remember to "npm install twitter" on command line
var spotify = require("spotify"); //remember to "npm install spotify" on command line
var Spotify = require('node-spotify-api');
var liri = process.argv[2]; //This holds the first command line input
let userINPUT = process.argv[3];



//add command line calls to functions here

switch (liri) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifySong(); break;
    case "movie-this": simpleRequest(); break;
    case "do-what-it-says": hazLo(); break;

};

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


function simpleRequest(results) {
    let movie = userINPUT;
    console.log("this is the movie chosen: " + movie);
    console.log("Results test: " + results);

    if (!movie) {
        console.log("MOON PRISM POWER");
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



function spotifySong() {
    //console.log("Spotify ID: " + keys.spotify.id);

    var spotify = new Spotify({
        id: "0b69126503894401b9000caef1c6e58b",
        secret: "f282337b81514df4ac49a20cb6d4fbb2",
    });


    var songName = userINPUT;
    var space = "\n" + "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
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
            output = space + "================= LIRI FOUND THIS FOR YOU...==================" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
            console.log(output);

            fs.appendFile("log.txt", output, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        };
    });

}









function myTweets(results) {
    console.log("Check results within myTweets Function: " + results);
    console.log("Are my keys working? " + keys.twitter);


    //Pull Twitter API keys and data
    var client = new twitter({
        consumer_key: keys.Twitter.consumer_key,
        consumer_secret: keys.Twitter.consumer_secret,
        access_token_key: keys.Twitter.access_token_key,
        access_token_secret: keys.Twitter.access_token_secret,
    });

    //Command Line input for twitter username
    let twitterUsername = userINPUT;
    console.log("result check: " + results);
    console.log("twitterUsername: " + twitterUsername);


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



