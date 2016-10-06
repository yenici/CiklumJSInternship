import { connect } from 'react-redux';

import Pokedex from '../components/Pokedex.jsx';
import { getFavorites, pinToFavorites, unpinFromFavorites } from '../actions/favorites';

const mapStateToProps = ({ favoritePokes, filter }) => ({
  pokemons: favoritePokes
    .filter(pokemon => (filter === 'all' || pokemon.types.indexOf(filter) !== -1))
    .sort((a, b) => (a.id - b.id)),
  next: null,
});

const mapDispatchToProps = dispatch => ({
  fetchFavorites: () => dispatch(getFavorites()),
  fetchPokemonsChunk: () => null,
  onPinToFavorites: pokemon => dispatch(pinToFavorites(pokemon)),
  onUnpinFromFavorites: pokemon => dispatch(unpinFromFavorites(pokemon)),
  onLoadNext: null,
});


const FavoritesContainer = connect(mapStateToProps, mapDispatchToProps)(Pokedex);

export default FavoritesContainer;
