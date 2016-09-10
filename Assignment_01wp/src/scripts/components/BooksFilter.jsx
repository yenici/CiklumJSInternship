import React, { PropTypes } from 'react';

function BooksFilter({ filter, onFilterClick }) {
  const options = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const filterElements = options.map((option, index) => {
    let optionElement;
    if (option === filter) {
      optionElement = <li key={index}>{option}</li>;
    } else {
      optionElement = (<li key={index}>
        <a
          className="BooksFilter__link"
          href=""
          onClick={e => { e.preventDefault(); onFilterClick(option); }}
        >
          {option}
        </a>
      </li>);
    }
    return optionElement;
  });
  return (
    <nav className="BooksFilter">
      <ul className="BooksFilter__options">
        <li>Filter by:</li>
        {filterElements}
      </ul>
    </nav>
  );
}

BooksFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Beginner', 'Intermediate', 'Advanced']),
  onFilterClick: PropTypes.func.isRequired,
};

BooksFilter.defaultProps = {
  filter: 'All',
};

export default BooksFilter;
