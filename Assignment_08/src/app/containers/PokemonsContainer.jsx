import React from 'react';
import { connect } from 'react-redux';

import Pokedex from '../components/Pokedex.jsx';
import { getFavorites, pinToFavorites, unpinFromFavorites } from '../actions/favorites';
import { getPokemonsChunk, filterPokemonsByType } from '../actions/pokemones';

class PokemonsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchFavorites();
    this.props.fetchPokemonsChunk();
  }
  render() {
    return (
      <Pokedex
        pokemons={this.props.pokemons}
        next={this.props.next}
        types={this.props.types}
        filter={this.props.filter}
        onPinToFavorites={this.props.onPinToFavorites}
        onUnpinFromFavorites={this.props.onUnpinFromFavorites}
        onLoadNext={this.props.onLoadNext}
        onSetFilter={this.props.onSetFilter}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const pokemons = state.pokemonsState.fetchedPokes.map((poke) => {
    if (state.favoritesState.favoritePokes.find(fpoke => fpoke.id === poke.id)) {
      // Mark pokemon as favorite
      return Object.assign(poke, { favorite: true });
    }
    return Object.assign(poke, { favorite: false });
  })
    .filter(pokemon =>
      (state.pokemonsState.filter === 'all' || pokemon.types.indexOf(state.pokemonsState.filter) !== -1))
    .sort((a, b) => (a.id - b.id)); // Sort by Id
  return {
    pokemons,
    next: state.next,
    types: ['all'].concat(Array.from(
      new Set(
        state.pokemonsState.fetchedPokes.reduce((types, pokemon) => types.concat(pokemon.types), [])
      )).sort()),
    filter: state.pokemonsState.filter,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFavorites: () => dispatch(getFavorites()),
  fetchPokemonsChunk: () => dispatch(getPokemonsChunk()),
  onPinToFavorites: pokemon => dispatch(pinToFavorites(pokemon)),
  onUnpinFromFavorites: pokemon => dispatch(unpinFromFavorites(pokemon)),
  onLoadNext: url => dispatch(getPokemonsChunk(url)),
  onSetFilter: (type) => dispatch(filterPokemonsByType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsContainer);
