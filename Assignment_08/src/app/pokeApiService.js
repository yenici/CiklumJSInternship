import fetch from 'isomorphic-fetch';

const pokeApiService = function pkeApiService() {
  return ({
    getChunk: () => fetch('http://pokeapi.co/api/v1/pokemon/?limit=1')
      .then(response => response.json()),
    getTypes: () => fetch('http://pokeapi.co/api/v1/type/?limit=999')
      .then(response => response.json()).then(r => r.objects.map(t => t.name)),
      // .then(response => response.json()),
    getType: () => fetch('http://pokeapi.co/api/v1/type/4/')
      .then(response => response.json()),

// Get chunk of pokemon list
// http://pokeapi.co/api/v1/pokemon/?limit=12
// Image of pokemon
// http://pokeapi.co/media/img/{{id}}.png  (or available through sprites.resource_uri resource)
// All possible types
// http://pokeapi.co/api/v1/type/?limit=999

    g: () => 'PokeMon',
  });
}

export default pokeApiService;

function getMovies(title) {
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