const rpn = require('request-promise-native');

const config = require('../config/config.json');

const errorLogger = require('../errorLogger');

const SearchCache = require('../models/SearchCacheSchema');

// GET /api/search/:query/:order/:filter
// router.route('/search/:query/:order/:filter')
exports.searchGet = (req, res) => {
  const query = req.params.query.trim().toLowerCase() || '';
  if (query.length === 0) {
    res.json({
      success: true,
      data: [],
      message: 'The query is an empty string.',
    });
  } else {
    SearchCache.findByIdAndUpdate(
      query,
      { $inc : { Counter: 1 }, timestamp: new Date() }, // update information about intensity of usage and last time usage
      { new: true, upsert: false },
      function(err, cachedQuery) {
        if (err) {
          errorLogger(err, 'Server error updating SearchCache collection.');
          res.json({
            success: false,
            message: 'Server error updating SearchCache collection.',
          });
          return;
        }
        if (cachedQuery) {
          res.json({
            success: true,
            data: cachedQuery.Results,
            message: 'The results are taken from the search cache.',
          });
        } else {
          const options = {
            uri: config.omdbApiUrl,
            qs: { s: query, r: 'json', page: 1, v: 1 },
            json: true,
          };
          rpn(options)
            .then(response => {
              if (response.Response === 'True') {
                const firstPage = response.Search;
                const totalResults = Number(response.totalResults);
                const pages = Math.ceil(totalResults / config.omdbRespMoviesOnPage);
                if (totalResults > firstPage.length) {
                  Promise.all(
                    [...Array(pages - 1).keys()]
                    // Starts from the 2nd page
                      .map(page => rpn(Object.assign(options, { qs: { s: query, r: 'json', page: page + 2, v: 1 } })))
                  ).then(pages => {
                    const moviesList = pages.reduce((movies, mpage) =>
                      mpage.Response === 'True' ? movies.concat(mpage.Search): movies, firstPage);
                    const searchCache = new SearchCache({
                      _id: query,
                      Results: moviesList,
                    });
                    searchCache.save((err) => {
                      if (err) {
                        // It's not a critical error for an end user.
                        errorLogger(err, 'Saving search results (multiple pages).');
                      }
                      res.json({
                        success: true,
                        data: moviesList,
                        message: 'The results are taken from the query.',
                      });
                    });
                  }).catch(err => {
                    errorLogger(err, 'Server error fetching multiple movie pages.');
                    res.json({
                      success: false,
                      message: 'Server error fetching multiple movie pages.',
                    });
                  });
                } else {
                  const searchCache = new SearchCache({
                    _id: query,
                    Results: firstPage,
                  });
                  searchCache.save((err) => {
                    if (err) {
                      // It's not a critical error for an end user.
                      errorLogger(err, 'Saving search results (single page).');
                    }
                    res.json({
                      success: true,
                      data: firstPage,
                      message: 'The results are taken from the single page query.',
                    });
                  });
                }
              } else {
                res.json({
                  success: true,
                  data: [],
                  message: 'No results found for the query.',
                });
              }
            })
            .catch(function (err) {
              errorLogger(err, 'Server error fetching first movie page.');
              res.json({
                success: false,
                message: 'Server error fetching first movie page.',
              });
            });
        }
      }
    );
  }
};
