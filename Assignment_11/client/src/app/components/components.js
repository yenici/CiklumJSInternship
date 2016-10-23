import angular from 'angular';

import Home from './home';
import Login from './login';
import Signin from './signin';
import Logout from './logout';
import OmdbMovies from './omdb-movies';
import MovieDetails from './movie-details';
// import Events from './events';

const components = angular
  .module('app.components', [
    Home,
    Login,
    Signin,
    Logout,
    OmdbMovies,
    MovieDetails,
    // Events
  ])
  .name;

export default components;
