const rpn = require('request-promise-native');

const config = require('../config/config.json');

const errorLogger = require('../errorLogger');
const MovieDetail = require('../models/MovieDetailSchema');

// GET /api/movie/:imdbid
exports.movieGet = (req, res) => {
  // Check if we have a movie with imdbid in MongoDB
  MovieDetail.findByIdAndUpdate(
    req.params.imdbid,
    { $inc : { Counter: 1 }, timestamp: new Date() }, // update information about intensity of usage and last time usage
    { new: true, upsert: false },
    function(err, movie) {
      if (err) {
        errorLogger(err, 'Server error on finding movie details.');
        res.json({
          success: false,
          message: 'Server error on finding movie details.',
        });
      } else if (movie === null) {
        // We have no movie with the imdbid in MongoDB. Let's try to get it with OMDB API
        const options = {
          uri: config.omdbApiUrl,
          qs: { i: req.params.imdbid, plot: 'full', r: 'json', tomatoes: false, v: 1 },
          json: true,
        };
        rpn(options)
          .then(film => {
            if (film.Response === 'True') {
              film._id = film.imdbID;
              film.Comments = [];
              const movie = new MovieDetail(film);
              // save the movie in MongoDB
              movie.save((err) => {
                if (err) {
                  errorLogger(err, 'Server error saving movie details.');
                  res.json({
                    success: false,
                    message: 'Server error saving movie details.',
                  });
                } else {
                  res.json({
                    success: true,
                    data: film,
                    message: 'The movie was cached.',
                  });
                }
              });
            } else {
              res.json({
                success: false,
                message: `No movie with imdbID = ${req.params.imdbid} was found.`,
              });
            }
          })
          .catch(err => {
            errorLogger(err);
            res.json({
              success: false,
              message: `Server error fetching movie details.`,
            });
          });
      } else {
        res.json({
          success: true,
          data: Object.assign(movie.toObject(), { imdbID: movie._id }),
          message: 'The movie was taken from the cache.',
        });
      }
    }
  );
};

// POST /api/movie/:imdbid/comment
exports.movieCommentPost = (req, res) => {
  if (req.user) {
    const username = req.user.name;
    if (!req.body.comment || req.body.comment.trim().length < 3) {
      res.json({
        success: false,
        message: 'The length of a comment should be greater or equal then 3 symbols',
      });
    } else {
      MovieDetail.findByIdAndUpdate(
        req.params.imdbid,
        { $push: { Comments:  { author: username, comment: req.body.comment.trim() } } },
        { new: true, upsert: false },
        function(err, movie) {
          if (err) {
            errorLogger(err, 'Server error on saving a comment.');
            res.json({
              success: false,
              message: 'Server error on saving a comment.',
            });
          } else {
            if (movie !== null) {
              res.json({
                success: true,
                data: Object.assign(movie.toObject(), { imdbID: movie._id }),
                message: 'The comment was added successfully.',
              });
            } else {
              res.json({
                success: false,
                message: `No movie with imdbID = ${req.params.imdbid} was found.`,
              });
            }
          }
        }
      );
    }
  } else {
    res.json({
      success: false,
      message: 'You must be logged in to comment a movie.',
    });
  }
};
