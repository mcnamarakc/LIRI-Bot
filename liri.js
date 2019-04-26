require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotifyClient = new Spotify(keys.spotify);

var axios = require("axios")
var nodeArgs = process.argv;

var movieName = "Mr. Nobody";
var songName = "";
var artist = "";

var commandType = process.argv[2]
if(commandType === "concert-this"){
    for(var i = 3; i <nodeArgs.length; i++) {
        if(i > 3 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i];
        }
        else {
            artist += nodeArgs[i];
        }
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
     axios.get(queryURL).then(
        function(response){
            for(var i = 0; i < 10; i++){
                // console.log(response);
                console.log("---------------");
                // Name of the Venue
                console.log("Venue: " + response.data[i].venue.name);
                // Venue location
                console.log("Venue: " + response.data[i].venue.city);
                // console.log("Location: " + 
                // Date of the Event (moment mm/dd/yyyy)
                console.log("Date: " + response.data[i].datetime)

            }
        }
    )
}
else if(commandType === "spotify-this-song"){
    for(var i = 3; i <nodeArgs.length; i++) {
        if(i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        }
        else {
            songName += nodeArgs[i];
        }
    }
    console.log(songName);
    spotifyClient.search({type: 'track', query: songName}, function(err, data) {
       if (err){
            return console.log('Error occurred: ' + err);
        } 
            // console.log(data);
            console.log("---------------");
            //         // Artist(s)
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name)
            //         // The song's name
            console.log("Song: " + data.tracks.items[0].name)
                       // the album the song is from 
            console.log("Album: " + data.tracks.items[0].album.name)
            //         // A preview link from the song from spotify
            console.log("Preview the song here: " + data.tracks.items[0].artists[0].external_urls.spotify)
});
    
    
}
else if(commandType === "movie-this"){
for(var i = 3; i <nodeArgs.length; i++) {
    if(i > 3 && i < nodeArgs.length) {
        movieName +=  "+" + nodeArgs[i];
    }
    else {
        movieName = nodeArgs[i];
    }
}
console.log(movieName)
var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// console.log(queryURL);

axios.get(queryURL).then(
    function(response){
        // console.log(response)
        console.log("------------------");
        // title
        console.log("Title: " + response.data.Title);
        // year
        console.log("Release Year: " + response.data.Year);
        // IMDB rating
        console.log("IMDB Rating: " + response.data.imdbRating);
        // Rotten Tomatoes Rating
        console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
        // Country of production
        console.log("Country of Production: " + response.data.Country);
        // language of the movie
        console.log("Language: " + response.data.English);
        // plot of the movie
        console.log("Plot: " + response.data.Plot);
        // actors in the movie
        console.log("Featured Actors: " + response.data.Actors);
        console.log("------------------");
    }
);}