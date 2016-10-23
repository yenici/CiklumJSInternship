const errorLogger = require('../errorLogger/index');

const Favorite = require('../models/FavoriteSchema');
const Movie = require('../models/MovieSchema');

exports.favoritesGet = (req, res) => {
  Favorite.findById(req.user.id, (err, favorites) => {
    if (err) {
      errorLogger(err, 'Server error on finding favorites.');
      res.json({
        success: false,
        message: 'Server error on finding favorites.',
      });
    } else {
      if (favorites === null) {
        res.json({
          success: true,
          data: [],
          message: 'There are no favorite movies for the user.',
        });
      } else {
        res.json({
          success: true,
          data: favorites.Movies,
          message: 'Favorite mov was found.',
        });
      }
    }
  });
};

exports.favoritesPost = (req, res) => {
  Favorite.findByIdAndUpdate( // TODO: Check for duplicate
    req.user.id,
    { $push: { Movies:  req.body.movie } },
    { new: true, upsert: true },
    function(err, movie) {
      if (err) {
        errorLogger(err, 'Server error on adding movie to favorites.');
        res.json({
          success: false,
          message: 'Server error on adding movie to favorites.',
        });
      } else {
        res.json({
          success: true,
          message: `Movie with imdbID = ${movie.imdbid} was added to favorites.`,
        });
      }
    }
  );
};

exports.favoritesDelete = (req, res) => {
  Favorite.findByIdAndUpdate(
    req.user.id,
    { $pull: { Movies:  { imdbID: req.params.imdbid } } },
    function(err, movie) {
      if (err) {
        errorLogger(err, 'Server error on deleting movie from favorites.');
        res.json({
          success: false,
          message: 'Server error on deleting movie from favorites.',
        });
      } else {
        res.json({
          success: true,
          message: `Movie with imdbID = ${req.params.imdbid} was removed from favorites.`,
        });
      }
    }
  );
};
