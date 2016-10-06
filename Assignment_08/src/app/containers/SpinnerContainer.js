import { connect } from 'react-redux';

import Spinner from '../components/Spinner.jsx';

const mapStateToProps = state => ({ active: (state.actionsInProgress > 0) });

const SpinnerContainer = connect(mapStateToProps)(Spinner);

export default SpinnerContainer;
