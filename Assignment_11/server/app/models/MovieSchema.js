const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    imdbID: String,
    Type: String,
    Poster: String,
    Title: String,
    Year: String,
  },
  {
    _id: false,
  });

module.exports = MovieSchema;
