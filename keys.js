var env = require('dotenv');

const Spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

module.exports = Spotify;

// console.log('this is loaded');

// exports.spotify = {
//     id: process.env.SPOTIFY_ID,
//     secret: process.env.SPOTIFY_SECRET
// };
