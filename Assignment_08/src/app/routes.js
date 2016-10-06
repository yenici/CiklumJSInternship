import React from 'react';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App.jsx';

import Home from './components/Home.jsx';
import PokedexContainer from './containers/PokemonsContainer.jsx';
import FavoritesContainer from './containers/FavoritesContainer.jsx';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/pokemons" component={PokedexContainer} />
      <Route path="/favorite" component={FavoritesContainer} />
    </Route>
  </Router>
);

