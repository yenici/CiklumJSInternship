import React, { Component, PropTypes } from 'react';

class BooksSearch extends Component {
  render() {
    // TODO: Replace string 'ref' with callback ref
    return (
      <form
        className="BooksSearch"
        onSubmit={e => {
          e.preventDefault();
          this.props.onSearchSubmit(this.refs.REPLACE.value);
        }}
      >
        <div className="BooksSearch__query">
          <input ref='REPLACE' type="text" defaultValue={this.props.query} placeholder="Search for..." />
        </div>
        <div className="BooksSearch__submit">
          <button type="submit">Search</button>
        </div>
      </form>
    );
  }
}

BooksSearch.propTypes = {
  query: PropTypes.string,
  onSearchSubmit: PropTypes.func.isRequired,
};

BooksSearch.defaultProps = {
  query: '',
};

export default BooksSearch;
