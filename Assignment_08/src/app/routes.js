import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';

import Home from './components/Home.jsx';
import PokedexContainer from './containers/PokedexContainer';
import FavoritesContainer from './containers/FavoritesContainer';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/pokemons" component={PokedexContainer} />
      <Route path="/favorite" component={FavoritesContainer} />
    </Route>
  </Router>
);
