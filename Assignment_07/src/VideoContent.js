import React, { Component } from 'react';
export default class App extends Component {
  render() {
    const video = {
      margin: 10
    }
    return <div style={video}>
        <iframe
          src={this.props.url}
          frameBorder="5"
          width="520"
          height="247"
          allowFullScreen
        />
      </div>
  }
}