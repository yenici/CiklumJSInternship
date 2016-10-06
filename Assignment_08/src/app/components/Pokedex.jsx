import React, { PropTypes } from 'react';
import PokemonCard from './PokemonCard.jsx';
import TypeFilterContainer from '../containers/TypeFilterContainer';

class Pokedex extends React.Component {
  componentDidMount() {
    this.props.fetchFavorites();
    this.props.fetchPokemonsChunk();
  }
  render() {
    return (
      <div className="pokedex">
        <TypeFilterContainer />
        <ul className="pokedex__pokemons">
          {this.props.pokemons.map(pokemon => (
            <li key={pokemon.name}>
              <PokemonCard
                pokemon={pokemon}
                onPinToFavorites={this.props.onPinToFavorites}
                onUnpinFromFavorites={this.props.onUnpinFromFavorites}
              />
            </li>
          ))}
        </ul>
        <button
          className="pokedex__load-next"
          onClick={() => this.props.onLoadNext(this.props.next)}
          style={{ display: (this.props.next === null) ? 'none' : 'block' }}
        >
          Load more...
        </button>
      </div>
    );
  }
}

Pokedex.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(PropTypes.string).isRequired,
      image: PropTypes.string.isRequired,
      favorite: PropTypes.bool,
    })
  ).isRequired,
  next: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // for null
  ]),
  fetchFavorites: PropTypes.func.isRequired,
  fetchPokemonsChunk: PropTypes.func.isRequired,
  onPinToFavorites: PropTypes.func.isRequired,
  onUnpinFromFavorites: PropTypes.func.isRequired,
  onLoadNext: PropTypes.func,
};

export default Pokedex;
