require("dotenv").config();
const fs = require('fs');
const Spotify = require('node-spotify-api');
const request = require('request');

const moment = require("moment");


const keys = require("./keys.js");
const spotify = new Spotify(keys);

const action = process.argv[2];
let parameter = process.argv[3];


switch (action) {
    case "concert-this":
        concertThis(parameter);
        break;

    case "spotify-this-song":
        spotifyThisSong(parameter);
        break;

    case "movie-this":
        movieThis(parameter);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Please type in a valid command...");
        break;
};


function concertThis(artist) {

    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (err, response, body) {

        const parse = JSON.parse(body);
        for (let i = 0; i < parse.length; i++) {
            console.log("Venue Name: " + parse[i].venue.name);
            console.log("Location: " + parse[i].venue.city + ", " + parse[i].venue.region);
            const formatTime = moment(parse[i].datetime, "YYYY-MM-DD HH:mm:ss").format("MM-DD-YYYY");
            console.log("Date: " + formatTime);
        }
    });
}





function spotifyThisSong(name) {
    spotify.search({ type: "track", query: name, limit: 1 }).then(function (data) {
        console.log(data);
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('Spotify Link: ' + data.tracks.items[0].preview_url);

    }).catch(function (err) {
        // console.log('Artist: Ace of Base');
        // console.log('Song: The Sign');
        // console.log('Album: The Sign');
        console.log(err);
    });
};

function movieThis() {
    let url = "http://www.omdbapi.com/?apikey=trilogy"
    parameter ? url += '&t=' + parameter : url += '&t=Mr. Nobody';
    url += '&type=movie';
    request(url, function (err, res, body) {

        body = JSON.parse(body);
        console.log('Title: ' + body.Title);
        console.log('Year: ' + body.Year);
        console.log('IMDB Rating: ' + body.Ratings[0].Value);
        console.log('Rotten Tomatoes Rating: ' + body.Ratings[1].Value);
        console.log('Countries Produced: ' + body.Country);
        console.log('Languages: ' + body.Language);
        console.log(body.Plot);
        console.log('Actors: ' + body.Actors);
    });

};


function doWhatItSays() {
    // reading plain text
    fs.readFile('random.txt', "utf-8", function (err, data) {

        if (err) {
            return console.log(err);
        }

        const randomText = data.split(",");


        const parameter = randomText[1];


        switch (randomText[0]) {

            case "concert-this":
                concertThis(parameter);
                break;

            case "spotify-this-song":
                spotifyThisSong(parameter);
                break;

            case "movie-this":
                movieThis(parameter);
                break;

            case "do-what-it-says":
                doWhatItSays();
                break;

            default:
                console.log("Please type in a valid command...");
                break;
        };

    });

};