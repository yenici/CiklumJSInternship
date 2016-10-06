import React, { PropTypes } from 'react';

const TypeFilter = ({ types, filter, onSetFilter }) => (
  <div className="type-filter">
    {types.map(type => (
      <button
        key={type}
        className={
          'type-filter__button'
            .concat(type === filter ? ' type-filter__button--active' : '')
            .concat(' pockemon-card__type')
            .concat(' pockemon-card__type--'.concat(type))
        }
        onClick={() => onSetFilter(type)}
      >
        {type}
      </button>
    ))}
  </div>
);

TypeFilter.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func,
};

export default TypeFilter;
