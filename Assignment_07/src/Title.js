import React, { Component } from 'react';

export default class App extends Component {
  render() {
   const style = {
    textAlign: 'center',
    fontSize: 26,
    margin: 10
  }
  return (
    <div style={style}>{this.props.title}</div>
    );
}
}