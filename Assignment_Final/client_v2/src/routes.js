import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from './components/App';
import FloorPlan from './components/FloorPlanContainer';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/floor" />
      <Route path="floor" component={FloorPlan} />
    </Route>
  </Router>
);
