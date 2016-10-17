import React, { Component } from 'react';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  componentDidMount() {
    const storedComments = window.localStorage.getItem('comments');
    if (storedComments !== null) {
      const comments = JSON.parse(storedComments);
      this.setState({ data: comments[this.props.videoId] || [] });
    }
  }
  handleCommentSubmit(comment) {
    let comments = {};
    const storedComments = window.localStorage.getItem('comments');
    if (storedComments !== null) {
      comments = JSON.parse(storedComments);
      if (comments[this.props.videoId]) {
        comment.id = comments[this.props.videoId].length + 1;
        comments[this.props.videoId] = comments[this.props.videoId].concat([comment]);
      } else {
        comment.id = 1;
        comments[this.props.videoId] = [comment];
      }
    } else {
      comment.id = 1;
      comments[this.props.videoId] = [comment];
    }
    window.localStorage.setItem('comments', JSON.stringify(comments));
    this.setState({ data: this.state.data.concat([comment]) });
  }
  render() {
    const commentBoxStyle = {
      border: '1px solid grey',
      borderRadius: '3px',
      margin: '10px',
      padding: '10px',
      fontStyle: 'normal',
    };
    return (
      <div style={commentBoxStyle}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Comments</h2>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

export default CommentBox;