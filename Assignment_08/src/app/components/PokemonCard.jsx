import React, { PropTypes } from 'react';

const PokemonCard = ({ pokemon, onPinToFavorites, onUnpinFromFavorites }) => (
  <div
    key={pokemon.id}
    className={'pockemon-card'.concat(pokemon.favorite ? ' pockemon-card--favorite' : '')}
  >
    <div
      className="pockemon-card__image"
      style={{ backgroundImage: `url(${pokemon.image})` }}
      title={`Pokemon ${pokemon.name}`}
    >
      <div className="pockemon-card__id">
        #{'0'.repeat(3 - pokemon.id.toString().length).concat(pokemon.id.toString())}
      </div>
      <div className="pockemon-card__image-fav">
        <i className="material-icons">favorite_border</i>
      </div>
    </div>
    <h2 className="pockemon-card__name">{pokemon.name}</h2>
    <div className="pockemon-card__abilities">
      {pokemon.types.map((type, index) => (
        <div
          key={index}
          className={'pockemon-card__type '.concat('pockemon-card__type--'.concat(type))}
        >
          {type}
        </div>
      ))}
    </div>
    <div className="pockemon-card__action-wrapper">
      <button
        className="pockemon-card__btn pockemon-card__btn--add"
        onClick={() => onPinToFavorites(pokemon)}
      >
        Add to favorites
      </button>
      <button
        className="pockemon-card__btn pockemon-card__btn--rm"
        onClick={() => onUnpinFromFavorites(pokemon)}
      >
        Remove from favorites
      </button>
    </div>
  </div>
);

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
  }).isRequired,
  onPinToFavorites: PropTypes.func,
  onUnpinFromFavorites: PropTypes.func,
};

export default PokemonCard;
