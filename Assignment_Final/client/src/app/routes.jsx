import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import SpacePlannerContainer from './containers/SpacePlannerContainer.jsx';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SpacePlannerContainer} />
    </Route>
  </Router>
);

// <Route path="/test" component={Test}>
//   <Route path="/sub1" component={SubTest1} />
//   <Route path="/sub2" component={SubTest2} />
//   <Route path="/sub3" component={SubTest3} />
// </Route>
