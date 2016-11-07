import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Login from '../components/Login.jsx';
import { login } from '../actions/authActions';

class LoginContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      browserHistory.push('/');
    }
  }
  render() {
    return (
      <Login
        message={this.props.message}
        onLogin={this.props.login}
      />
    );
  }
}

const mapStateToProps = state => ({
  token: state.globalState.token,
  message: state.globalState.message,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
});

LoginContainer.PropTypes = {
  token: PropTypes.string,
  message: PropTypes.string,
  login: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
