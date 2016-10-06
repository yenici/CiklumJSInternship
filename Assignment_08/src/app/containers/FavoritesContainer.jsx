import React from 'react';
import { connect } from 'react-redux';

import Pokedex from '../components/Pokedex.jsx';
import { getFavorites, pinToFavorites, unpinFromFavorites, filterFavoritesByType } from '../actions/favorites';

class FavoritesContainer extends React.Component {
  componentDidMount() {
    this.props.fetchFavorites();  // TODO: May be it's not a good idea to update favs each time
  }
  render() {
    return (
      <Pokedex
        pokemons={this.props.pokemons}
        next={null}
        types={this.props.types}
        filter={this.props.filter}
        onPinToFavorites={this.props.onPinToFavorites}
        onUnpinFromFavorites={this.props.onUnpinFromFavorites}
        onLoadNext={null}
        onSetFilter={this.props.onSetFilter}
      />
    );
  }
}

const mapStateToProps = state => ({
  pokemons: state.favoritesState.favoritePokes
    .filter(pokemon =>
      (state.favoritesState.filter === 'all' || pokemon.types.indexOf(state.favoritesState.filter) !== -1))
    .sort((a, b) => (a.id - b.id)),
  next: null,
  types: ['all'].concat(Array.from(
    new Set(
      state.favoritesState.favoritePokes.reduce((types, pokemon) => types.concat(pokemon.types), [])
    )).sort()),
  filter: state.favoritesState.filter,
});

const mapDispatchToProps = dispatch => ({
  fetchFavorites: () => dispatch(getFavorites()),
  onPinToFavorites: pokemon => dispatch(pinToFavorites(pokemon)),
  onUnpinFromFavorites: pokemon => dispatch(unpinFromFavorites(pokemon)),
  onSetFilter: type => dispatch(filterFavoritesByType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
