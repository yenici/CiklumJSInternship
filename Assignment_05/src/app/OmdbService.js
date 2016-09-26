import { isNumber, fromJson } from 'angular';

const OmdbService = function OmdbService($httpParamSerializer, $http, $q, config) {
  return {
    getMoviePage(title, page = 1) {
      const url = config.omdbUrl.concat(
        $httpParamSerializer({
          s: title.trim(),
          page: isNumber(page) ? page.toString() : 1,
        })
      );
      return $http.get(url)
        .then((response) => {
          const json = fromJson(response.data);
          if (json.Response === 'True') {
            return {
              count: Number(json.totalResults),
              movies: json.Search,
            };
          }
          return {
            count: 0,
            movies: [],
          };
        }, () => ({ count: 0, movies: [] })); // TODO: Error handling
    },
    searchMovie(title) {
      return this.getMoviePage(title, 1)
        .then((firstPage) => {
          if (firstPage.count > config.omdbRespMovOnPage) {
            const pageCnt =
              Math.ceil(firstPage.count / config.omdbRespMovOnPage);
            return $q.all(
              [...Array(pageCnt - 1).keys()] // We've already got the 1st page
                .map(no => this.getMoviePage(title, no + 2))) // Starts from the 2nd page
              .then(pages => pages.reduce(
                (r, page) => r.concat(page.movies),
                firstPage.movies));
          }
          return firstPage.movies;
        });
    },
  };
};

export default OmdbService;
