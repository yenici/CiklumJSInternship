import { connect } from 'react-redux';
import { setSearchFilter } from '../actions';
import BooksSearch from '../components/BooksSearch.jsx';


const mapStateToProps = (state) => (
  { query: state.searchFilter }
);

const mapDispatchToProps = (dispatch) => (
  { onSearchSubmit: (query) => dispatch(setSearchFilter(query)) }
);

const BooksSearchFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(BooksSearch);

export default BooksSearchFilter;
