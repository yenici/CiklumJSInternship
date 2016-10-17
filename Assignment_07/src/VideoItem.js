import React, { Component } from 'react';

import Title from './Title';
import VideoContent from './VideoContent';
import CommentBox from './CommentBox';

export default class VideoItem extends Component {
  constructor(props){
    super(props);
    this.state = {title: this.props.data.title}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({title: 'New title is here!!!!'})
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  render() {
    const videoStyle = {
      justifyContent: 'space-between',
      minHeight: 200,
      border: '1px solid #ccc',
      fontFamily: "'Raleway', sans-serif",
      fontStyle: 'italic',
      margin: '10px',
      backgroundColor: "#e6e6e6"
    };
    return (
      <div style={videoStyle}>
        <Title title={this.state.title} />
        <VideoContent url={this.props.data.video} />
        <p><a href="#" onClick={this.handleClick}> Click Me </a></p>
        <CommentBox videoId={this.props.data.id} />
      </div>
    );
  }
}