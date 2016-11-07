import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import SpacePlannerContainer from './containers/SpacePlannerContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SpacePlannerContainer} />
      <Route path="/login" component={LoginContainer} />
    </Route>
  </Router>
);

