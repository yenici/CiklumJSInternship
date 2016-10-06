import React from 'react';
import { Link } from 'react-router';

import SpinnerContainer from '../containers/SpinnerContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div className="header__logo"><Link to="/">PokéAPI</Link></div>
          <nav className="header__nav-panel">
            <ul className="header__menu">
              <li>
                <Link
                  to="/pokemons"
                  activeClassName="header__menu-link--active"
                  className="header__menu-link"
                >Pokémons</Link>
              </li>
              <li>
                <Link
                  to="/favorite"
                  activeClassName="header__menu-link--active"
                  className="header__menu-link"
                >Favorites</Link>
              </li>
            </ul>
          </nav>
        </header>
        <SpinnerContainer />
        {this.props.children}
      </div>
    );
  }
}

export default App;
