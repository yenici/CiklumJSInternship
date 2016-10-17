import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state = { author: '', text: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  }
  render() {
    const formStyle = {
      border: '1px solid grey',
      borderRadius: '3px',
      margin: '10px',
      padding: '10px',
      fontStyle: 'normal',
      display: 'flex',
      flexFlow: 'column',
    };
    const btnStyle ={
      backgroundColor: '#5cb85c',
      borderColor: '#4cae4c',
      color: '#fff',
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.42857143,
      margin: '5px 0',
      maxWidth: '120px',
      padding: '6px 12px',
      textAlign: 'center',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
  };
    return (
      <form style={formStyle} onSubmit={this.handleSubmit}>
        <input
          style={{ display: 'block', margin: '6px' }}
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          style={{ display: 'block', margin: '6px' }}
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input style={btnStyle} type="submit" value="Post" />
      </form>
    );
  }
}

export default CommentForm;
