import React, { PropTypes } from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  fgh() {}
  render() {
    const messageStyle = {
      color: 'red',
      fontSize: '0.75rem',
      textAlign: 'center',
      overflow: 'hidden',
    };
    return (
      <div className="login-form pure-form pure-form-aligned">
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
              className="pure-button pure-button-primary"
              onClick={() => this.props.onLogin(this.state.username, this.state.password)}
            >
              Log in
            </button>
          </div>
        </fieldset>
      </div>
    );
  }
}

Login.PropTypes = {
  message: PropTypes.string,
  onLogin: PropTypes.func,
};

export default Login;
