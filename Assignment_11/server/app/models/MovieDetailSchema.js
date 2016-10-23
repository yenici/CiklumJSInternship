const mongoose = require('mongoose');

const MovieDetailSchema = new mongoose.Schema({
  _id: String,
  timestamp: { type: Date, default: Date.now },
  Type: String,
  Poster: String,
  Title: String,
  imdbRating: String,
  imdbVotes: String,
  Metascore: String,
  Year: String,
  Released: String,
  Country: String,
  Rated: String,
  Runtime: String,
  Language: String,
  Genre: String,
  Plot: String,
  Production: String,
  Director: String,
  Writer: String,
  Actors: String,
  Awards: String,
  Comments: [{
    timestamp: { type: Date, default: Date.now },
    author: String,
    comment: String,
  }],
  Counter: { type: Number, default: 0 },
});

// compile and export our model
module.exports = mongoose.model('MovieDetail', MovieDetailSchema);
