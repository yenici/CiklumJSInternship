import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ModalWindow from './ModalWindow.jsx';
import SpinnerContainer from '../containers/SpinnerContainer';

const App = function App(props) {
  return (
    <div>
      <header>
        <div className="header__logo">
          <Link to="/">
            <img src="favicon.png" alt="Ciklum logo" /> Ciklum Space
          </Link>
        </div>
        <div>
          <Link to="/login" className="pure-button pure-button-primary">Log in</Link>
        </div>
      </header>
      <ModalWindow />
      <SpinnerContainer />
      { props.children }
    </div>
  );
};

export default App;
