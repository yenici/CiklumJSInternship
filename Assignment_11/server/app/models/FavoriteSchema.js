const mongoose = require('mongoose');

const movieSchema = require('./MovieSchema');

const FavoriteSchema = new mongoose.Schema({
  _id: String,
  Movies: [movieSchema],
});

// compile and export our model
module.exports = mongoose.model('Favorite', FavoriteSchema);
