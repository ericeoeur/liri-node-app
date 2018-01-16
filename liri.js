require("dotenv").config();
var keys = require("./keys.js");

//console.log(keys.Spotify);

//var spotify = new Spotify(keys.Spotify);
//var client = new Twitter(keys.twitter);

let spotify = keys.Spotify; 
let client = keys.Twitter;  



console.log(spotify);
console.log(client);
