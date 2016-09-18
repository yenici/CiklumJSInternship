/* global require, XMLHttpRequest: true */

require('../index.html');
require('../images/favicon.ico');

document.getElementById('js-search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // document.getElementById('js-search-form').getElementsByTagName('input')[0].value;
  const movies = getFilms(document.getElementById('js-search-form').getElementsByTagName('input')[0].value);
  // Currently in North America today the principal advertising size for a
  // movie poster is 27" x 40" commonly referred to as the one sheet.
  // const d = movies.reduce((m, movie) => (m + `<div><img src="${movie.Poster}">${movie.Title}</div>`), '');
  // document.getElementById('js-result').insertAdjacentHTML(d);
});

function getFilms(title, page = 1) {
  const OMBD_API_URL = 'http://www.omdbapi.com';
  const oReq = new XMLHttpRequest();
  oReq.open(
    'GET',
    `${OMBD_API_URL}/?s=${title.trim()}&page=${page}`,
    true
  );
  oReq.onload = function() {
    if (oReq.status >= 200 && oReq.status < 400) {
      const movies = JSON.parse(oReq.responseText, (k, v) => {
        // console.log(k, v);
        let converted;
        switch (k) {
          case 'Response':
            converted = (v === 'True');
            break;
          case 'totalResults':
          case 'Year':
            converted = Number(v);
            break;
          case 'Poster':
            if (v === 'N/A') {
              // TODO: Add a link to default poster
              converted = 'default';
            } else {
              converted = v;
            }
            break;
          default:
            converted = v;
        }
        return converted;
      });
      const d = movies.Search.reduce((m, movie) => (m + `<div><img src="${movie.Poster}" width="54" height="80">${movie.Poster}<h4>${movie.Title}</h4></div>`), '');
      document.getElementById('js-result').insertAdjacentHTML('afterend', d);
    } else {
      console.log('XMLHttpRequest server error.');
    }
  };
  oReq.onerror = () => console.log('XMLHttpRequest connection error.');
  oReq.send();
}

// OMDb API parameters by search:
//
// =====================================================================================
// Parameter  | Required |  Valid options	|  Default Value |       Description
// =====================================================================================
//  s	        |   Yes		 |                |    <empty>	  | Movie title to search for.
// -------------------------------------------------------------------------------------
//  type	    |   No	   | movie, series, | 	 <empty>	  | Type of result to return.
//            |          | episode        |               |
// -------------------------------------------------------------------------------------
//  y	        |   No		 |                |    <empty>	  | Year of release.
// -------------------------------------------------------------------------------------
//  r	        |   No	   | json, xml	    |     json	    | The data type to return.
// -------------------------------------------------------------------------------------
//  page    	|   No	   | 1-100	        |     1	        | Page number to return.
// -------------------------------------------------------------------------------------
//  callback	|   No		 | <empty>	      |               | JSONP callback name.
// -------------------------------------------------------------------------------------
//  v	        |   No		 |                |     1	        | API version (reserved for
//            |          |                |               | future use).
// -------------------------------------------------------------------------------------
