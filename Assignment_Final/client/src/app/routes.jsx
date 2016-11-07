import React from 'react';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App.jsx';
import SpacePlannerContainer from './containers/SpacePlannerContainer.jsx';
import Login from './components/Login.jsx';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SpacePlannerContainer} />
      <Route path="/login" component={Login} />
    </Route>
  </Router>
);

