import { connect } from 'react-redux';

import Pokedex from '../components/Pokedex.jsx';
import { getFavorites, pinToFavorites, unpinFromFavorites } from '../actions/favorites';
import { getPokemonsChunk } from '../actions/pokemones';

const mapStateToProps = (state) => {
  const pokemons = state.fetchedPokes.map((poke) => {
    if (state.favoritePokes.find(fpoke => fpoke.id === poke.id)) {
      // Mark pokemon as favorite
      return Object.assign(poke, { favorite: true });
    }
    return Object.assign(poke, { favorite: false });
  }).sort((a, b) => (a.id - b.id)); // Sort by Id
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


const PokedexContainer = connect(mapStateToProps, mapDispatchToProps)(Pokedex);

export default PokedexContainer;
