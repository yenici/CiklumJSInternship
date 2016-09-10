import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import BooksFilter from '../components/BooksFilter.jsx';


const mapStateToProps = (state) => (
  { filter: state.visibilityFilter }
);

const mapDispatchToProps = (dispatch) => (
  { onFilterClick: (filter) => dispatch(setVisibilityFilter(filter)) }
);

const BooksLevelFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(BooksFilter);

export default BooksLevelFilter;
