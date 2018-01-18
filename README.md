# liri-node-app

# Welcome to LIRI! 
## Your Language Interpretation and Recognition Inferface

#### LIRI takes in text and outputs information that you will find useful. Unfortunately, LIRI is a youngin' and doesn't know a lot. However, she can help you with the following things:

* _my-tweet_ Find the 20 latest tweets of any public Twitter account. This uses the Twitter API. 
    * In the command line type in "node liri.js my-tweets [insert twitter account handle]"
    * Example: "node my-tweets oprah" or "node my-tweets costco" 
    * If you don't type in a Twitter account handle, it will show the latest 20 tweets from my account @ericetwice 

* _spotify-this-song_  Shows information about a song including Artist, Song Name, Preview Link, and Album the song is from. This uses the Spotify API.  
    * In the command line type in "node spotify-this-song "[insert song nam]""
    * Example: 'node liri.js spotify-this-song "My Heart Will Go On"' or 'node liri.js spotify-this-song "toxic"' 
    * If you don't type in a Song, a default song will appear. 

* _movie-this_ Find information about a movie using the OMDB Database. 
    * In the command line type in "node liri.js movie-this [insert movie name here]"
    * Example: 'node liri.js movie-this "pokemon"' or "node liri.js movie-this "Harry Potter"' 
    * If you don't type in a movie, a default movie will appear. 

* _do-what-it-says_ Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    * In the command line type in "node liri.js do-what-it-says"
    * This is defaulted to use _spotify-this-song_ to find information about my favorite Celine Dion song. 

#### When you ask LIRI to do any of these actions, it will log this information in a log.txt file. 

##### This is a project from the Coding Boot Camp at UT. Created by Eric Oeur 

