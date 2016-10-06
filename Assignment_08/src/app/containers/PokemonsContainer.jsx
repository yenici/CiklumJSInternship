import React from 'react';
import { connect } from 'react-redux';

import Pokedex from '../components/Pokedex.jsx';
import { getFavorites, pinToFavorites, unpinFromFavorites } from '../actions/favorites';
import { getPokemonsChunk } from '../actions/pokemones';

class PokedexContainer extends React.Component {
  componentDidMount() {
    this.props.fetchFavorites();
    this.props.fetchPokemonsChunk();
  }
  render() {
    return (
      <Pokedex
        pokemons={this.props.pokemons}
        onPinToFavorites={this.props.onPinToFavorites}
        onUnpinFromFavorites={this.props.onUnpinFromFavorites}
        next={this.props.next}
        onLoadNext={this.props.onLoadNext}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const pokemons = state.fetchedPokes.map((poke) => {
    if (state.favoritePokes.find(fpoke => fpoke.id === poke.id)) {
      // Mark pokemon as favorite
      return Object.assign(poke, { favorite: true });
    }
    return Object.assign(poke, { favorite: false });
  })
    .filter(pokemon => (state.filter === 'all' || pokemon.types.indexOf(state.filter) !== -1))
    .sort((a, b) => (a.id - b.id)); // Sort by Id
  return {
    pokemons,
    next: state.next,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFavorites: () => dispatch(getFavorites()),
  fetchPokemonsChunk: () => dispatch(getPokemonsChunk()),
  onPinToFavorites: pokemon => dispatch(pinToFavorites(pokemon)),
  onUnpinFromFavorites: pokemon => dispatch(unpinFromFavorites(pokemon)),
  onLoadNext: url => dispatch(getPokemonsChunk(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokedexContainer);