require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs"); //remember to "npm install fs" on command line
var request = require("request"); //remember to "npm install request" on command line
var twitter = require("twitter"); //remember to "npm install twitter" on command line
var spotify = require ("spotify"); //remember to "npm install spotify" on command line
var liri= process.argv[2]; //This holds the first command line input
console.log ("This is what was inputted: " + liri);




//add command line calls to functions here
switch(liri) {
    case "my-tweets": myTweets(); break;
    //case "spotify-shit"

};


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
    var twitterUsername = process.argv[3];

    //If no username was entered default to your own twitter handle
    if(!twitterUsername){
        twitterUsername = "ericetwice";
    }

    //Change the screen_name default (Which is ericetwice) to the one entered in the command line
    twitterHandle = {
        screen_name: twitterUsername
    };


    //Twitter API Documentation -- pulling from user_timeline. 
    // use this as reference: https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html
    client.get("statuses/user_timeline/", twitterHandle, function(error, data, response){
        if (!error) {
            for(let i = 1; i < 20; i++) {
               
                let results = 
                data[i].text + "\r\n\r\n" + 
                "Tweeted on: " + data[i].created_at + "\r\n\r\n" + 
                "*********************** @" + data[i].user.screen_name + "'s Tweet Number: "  + i + " *********************** " + "\r\n";
                console.log(results);
                 //console.log(response); //this shows everything from user_timeline
             
            }
        }  else {
            console.log("There was an error. Error code: "+ error);
            return;
        }
    });

}



