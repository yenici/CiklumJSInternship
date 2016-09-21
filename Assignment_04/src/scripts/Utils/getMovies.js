import fetch from 'isomorphic-fetch';

const OMDB_API_URL = 'http://www.omdbapi.com';
const OMDB_MOVIES_ON_PAGE = 10;

export default function getMovies(title) {
  /**
   * Fetch movies' page by title and page number
   * @param query - search query
   * @param page - number of a page
   */
  const getMoviesPage = function getMoviesPage(query, page) {
    /**
     * Forrms search URI
     * @param s - search query
     * @param p - number of a page
     * @returns {string}
     */
    const formURI = function formURI(s, p = 1) {
      return OMDB_API_URL.concat(
        '/?s=',
        encodeURIComponent(s.trim()),
        '&page=',
        isNaN(Number(p)) ? '1' : p.toString()
      );
    };
    return fetch(formURI(query, page))
      .then(response => response.json())
      .then(json => ({ count: json.totalResults, movies: json.Search }));
  };

  return getMoviesPage(title)
    .then((response) => {
      if (response.count !== undefined && response.count > OMDB_MOVIES_ON_PAGE) {
        // Get the rest of the movies
        const numOfPages = Math.ceil(response.count / OMDB_MOVIES_ON_PAGE);
        return Promise.all(
          [...Array(numOfPages - 1).keys()] // We've already got the 1st page
            .map(page => getMoviesPage(title, page + 2)) // Starts from the 2nd page
        )
          .then(pages => pages.reduce((r, page) =>
            ({ count: r.count, movies: r.movies.concat(page.movies) }), response));
      }
      if (response.count !== undefined) {
        return response;
      }
      return {
        count: 0,
        movies: [],
      };
    });
}
