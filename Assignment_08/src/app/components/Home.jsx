/* global require: true */

import React from 'react';

const Home = () => (
  <div className="pokehome">
    <img className="pokehome__logo" src={require('../../images/logo.svg')} alt="Pokemons Logo" />
  </div>
);

export default Home;
