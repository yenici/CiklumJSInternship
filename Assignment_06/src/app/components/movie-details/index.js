import angular from 'angular';

import MovieDetailsComponent from './movie-details.component';
// import SearchComponent from './search';
// import FavoritesComponent from './favorites';
// import MoviesTableComponent from './movies-table';
// import FavoritesService from './favorites.service';
// import OmdbService from './omdb.service';

const moviedetails = angular
  .module('moviedetails', [])
  .component('moviedetails', MovieDetailsComponent)
  // .service('OmdbService', OmdbService)
  // .constant('config', {
  //   omdbUrl: 'http://www.omdbapi.com/?',
  //   omdbRespMovOnPage: 10,
  //   moviesOnPage: 7,
  // })
  .name;

export default moviedetails;
