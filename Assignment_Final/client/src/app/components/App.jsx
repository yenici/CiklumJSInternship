import React from 'react';

import ModalWindow from './ModalWindow.jsx';
import SpinnerContainer from '../containers/SpinnerContainer';

const App = function App(props) {
  return (
    <div>
      <header>
        <div className="header__logo">
          <a href="/">
            <img src="favicon.png" alt="Ciklum logo" /> Ciklum Space
          </a>
        </div>
        <div>
          <button>Log out</button>
        </div>
      </header>
      <ModalWindow />
      <SpinnerContainer />
      { props.children }
    </div>
  );
};

export default App;
