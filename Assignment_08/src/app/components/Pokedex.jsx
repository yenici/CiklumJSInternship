import React, { PropTypes } from 'react';
import PokemonCard from './PokemonCard.jsx';
import TypeFilter from '../components/TypeFilter.jsx';


const Pokedex = ({ pokemons, next, types, filter,
  onPinToFavorites, onUnpinFromFavorites, onLoadNext, onSetFilter }) => (
  <section>
    <TypeFilter types={types} filter={filter} onSetFilter={onSetFilter} />
    <div className="pokedex">
      <ul className="pokedex__pokemons">
        {pokemons.map(pokemon => (
          <li key={pokemon.name}>
            <PokemonCard
              pokemon={pokemon}
              onPinToFavorites={onPinToFavorites}
              onUnpinFromFavorites={onUnpinFromFavorites}
            />
          </li>
        ))}
      </ul>
      <button
        className="pokedex__load-next"
        onClick={() => onLoadNext(next)}
        style={{ display: (next === null) ? 'none' : 'block' }}
      >
        Load more...
      </button>
    </div>
  </section>
);

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
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
  onPinToFavorites: PropTypes.func.isRequired,
  onUnpinFromFavorites: PropTypes.func.isRequired,
  onLoadNext: PropTypes.func,
  onSetFilter: PropTypes.func,
};

export default Pokedex;
