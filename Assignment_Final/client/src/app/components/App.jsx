import React from 'react';
import { Link } from 'react-router';

import ModalWindow from './ModalWindow.jsx';
import SpinnerContainer from '../containers/SpinnerContainer';
import AuthManger from './AuthManager.jsx';

const App = function App(props) {
  return (
    <div>
      <header>
        <div className="header__logo">
          <Link to="/">
            <img src="favicon.png" alt="Ciklum logo" /> Ciklum Space
          </Link>
        </div>
        <AuthManger />
      </header>
      <ModalWindow />
      <SpinnerContainer />
      { props.children }
    </div>
  );
};

export default App;
