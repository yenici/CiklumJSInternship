import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logout } from '../actions/authActions';

const AuthManager = ({ token, onLogout }) => {
  return (
    <div>
      {
        token
          ? <button className="pure-button" onClick={() => onLogout()}>Log out</button>
          : <Link to="/login" className="pure-button pure-button-primary">Log in</Link>
      }
    </div>
  );
};

AuthManager.propTypes = {
  token: PropTypes.string,
  onLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  token: state.globalState.token,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthManager);
