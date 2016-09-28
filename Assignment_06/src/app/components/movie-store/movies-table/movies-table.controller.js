class MoviesTableController {
  constructor(config) {
    this.config = config;
    this.orderExpr = 'Title';
    this.orderDesc = false;
    this.filterTypes = [];
    this.filterExpr = 'all';
    this.paginator = {
      currentPage: 0,
      totalPages: 0,
    };
  }
  // $onInit() {
  //   this.filterTypes =
  //     this.allMovies.reduce((types, movie) => types.add(movie.Type), (new Set()).add('all'));
  //   this.setFilter(this.filterExpr); // creates movies[]
  //   this.setOrder(); // sort movies[]
  // }
  $onChanges(changes) {
    if (changes.allMovies) {
      this.allMovies = changes.allMovies.currentValue;
      this.filterTypes =
        [...this.allMovies.reduce((types, movie) => types.add(movie.Type), new Set())];
      this.setFilter(this.filterExpr); // creates movies[]
      this.setOrder(); // sort movies[]
    }
  }
  setFilter(filter) {
    this.filterExpr = filter;
    if (this.filterExpr === 'all') {
      this.movies = this.allMovies;
    } else {
      this.movies = this.allMovies.filter(movie => movie.Type === this.filterExpr);
    }
    if (this.movies.length > 0) {
      this.setOrder(); // Store current order
      this.paginator = {
        currentPage: 1,
        totalPages: Math.ceil(this.movies.length / this.config.moviesOnPage),
      };
    } else {
      this.paginator = {
        currentPage: 0,
        totalPages: 0,
      };
    }
  }
  setOrder(order) {
    function moviesComparator(key, descending) {
      return (a, b) => {
        let result;
        if (a[key] < b[key]) {
          result = -1;
        } else if (a[key] > b[key]) {
          result = 1;
        } else {
          result = 0;
        }
        if (descending === true) {
          return -result;
        }
        return result;
      };
    }
    // Function body
    if (order !== undefined) {  // Store the original order in case of order === undefined
      if (order === this.orderExpr) {
        this.orderDesc = !this.orderDesc; // Change order
      } else {
        this.orderExpr = order;
        this.orderDesc = false; // Set new order, ascending
      }
    }
    // We can change the original array
    this.movies.sort(moviesComparator(this.orderExpr, this.orderDesc));
  }
  pinMovie(imdbID) {
    // Find the movie by imdbID
    const movie = this.allMovies.find(item => item.imdbID === imdbID);
    if (movie !== undefined) {
      this.onPinToFavorites({
        $event: {
          movie,
        },
      });
    }
  }
}

MoviesTableController.$inject = ['config'];

export default MoviesTableController;
