import { connect } from 'react-redux';

import { filterFavoritesByType } from '../actions/favorites';
import TypeFilter from '../components/TypeFilter.jsx';

const mapStateToProps = ({ filter, favoritePokes }) => ({
  filter,
  types: ['all'].concat(Array.from(
    new Set(
      favoritePokes.reduce((types, pokemon) => types.concat(pokemon.types), [])
    )).sort()),
});

const mapDispatchToProps = dispatch => ({
  onSetFilter: type => dispatch(filterFavoritesByType(type)),
});


const TypeFilterContainer = connect(mapStateToProps, mapDispatchToProps)(TypeFilter);

export default TypeFilterContainer;
