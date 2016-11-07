import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { login } from '../actions/authActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    const messageStyle = {
      color: 'red',
      fontSize: '0.75rem',
      textAlign: 'center',
      overflow: 'hidden',
    };
    if (this.props.token) {
      return (
        <div className="login-form login-form__hello pure-form pure-form-aligned">
          <h1>{`Hello, ${this.props.username}`}!</h1>
          <Link to="/" className="pure-button pure-button-primary">Continue</Link>
        </div>
      );
    }
    return (
      <form className="login-form pure-form pure-form-aligned" id="login-form">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="name">Username</label>
            <input
              id="name"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={event =>
                this.setState(Object.assign({}, this.state, { username: event.target.value }))}
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={event =>
                this.setState(Object.assign({}, this.state, { password: event.target.value }))}
            />
          </div>
          <div style={messageStyle}>{this.props.message}</div>
          <div className="pure-controls">
            <button
              form="login-form"
              type="button"
              className="pure-button pure-button-primary"
              onClick={() => this.props.onLogin(this.state.username, this.state.password)}
            >
              Log in
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

Login.PropTypes = {
  token: PropTypes.string,
  username: PropTypes.string,
  message: PropTypes.string,
  onLogin: PropTypes.func,
};

const mapStateToProps = state => ({
  token: state.globalState.token,
  username: state.globalState.username,
  message: state.globalState.message,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
