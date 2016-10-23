const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/config.json');

const authController = require('./controllers/authenticate');
const favoritesController = require('./controllers/favorites');
const searchController = require('./controllers/search');
const movieController = require('./controllers/movie');

mongoose.Promise = global.Promise; // Use native Node promises
mongoose.connect(config.mongoConnectionString, (err) => {
  if (err) {
    throw(err);
  } else {
    console.log('Connection with MongoDB server established.');
  }
});

const Log = require('./models/LogSchema');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(passport.initialize());
require('./config/passport')(passport);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Log request
app.use((req, res, next) => {
  const log = new Log({
    clientIP: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    authenticated: req.isAuthenticated(),
    originalUrl: req.originalUrl,
    params: JSON.stringify(req.params),
    query: JSON.stringify(req.query),
  });
  log.save(err => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

// Add routes
const router = express.Router();

// Create endpoint handlers for /beers
router.post('/authenticate', authController.authenticatePost);

router.post('/signin', authController.createPost);

router.get('/favorites', passport.authenticate('jwt', { session: false }), favoritesController.favoritesGet);
router.post('/favorites', passport.authenticate('jwt', { session: false }), favoritesController.favoritesPost);
router.post('/favorites/:imdbid', passport.authenticate('jwt', { session: false }), favoritesController.favoritesDelete);

router.get('/movie/:imdbid', movieController.movieGet);
router.post('/movie/:imdbid/comment', passport.authenticate('jwt', { session: false }), movieController.movieCommentPost);

router.get('/search/:query', searchController.searchGet);

// Register all our routes with /api
app.use('/api', router);

module.exports = app;
