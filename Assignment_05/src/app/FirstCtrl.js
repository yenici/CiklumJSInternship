export default class FirstCtrl {
  constructor(omdbService) {
    this.omdbService = omdbService;
    this.movies = [];
    this.queryInProgress = false;
    this.query = '';
    this.movieTypes = ['movie', 'series', 'episode', 'game'];
    this.filterExpr = '';
    this.orderExpr = 'omdbID';
    this.orderDesc = false;
  }
  searchMovie() {
    this.query = this.query.trim();
    this.movies = [];
    this.queryInProgress = true;
    this.omdbService.searchMovie(this.query).then((movies) => {
      this.queryInProgress = false;
      this.movies = movies;
    });
  }
  setOrder(order) {
    this.orderDesc = (this.orderExpr === order) ? !this.orderDesc : false;
    this.orderExpr = order;
  }
  setFilter(filter) {
    this.filterExpr = filter;
  }
}
