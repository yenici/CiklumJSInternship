const mongoose = require('mongoose');

const movieSchema = require('./MovieSchema');

const SearchCacheSchema = new mongoose.Schema({
  _id: String,
  timestamp: { type: Date, default: Date.now },
  Counter: { type: Number, default: 0 },
  Results: [movieSchema],
});

// compile and export our model
module.exports = mongoose.model('SearchCache', SearchCacheSchema);
