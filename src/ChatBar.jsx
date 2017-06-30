import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
  }

  //// Custom event handlers ////

  //Form validation for username input
  handleUserName = (event) => {
    let userName;
    if (event.key === 'Enter' && event.target.value.length > 1) {
      userName = event.target.value;
      this.props.getUser(userName);
    }
  }

  // Form validation for message input
  handleUserMessage = (event) => {
    let userMessage;
    if(event.key === 'Enter' && event.target.value.length > 1) {
      userMessage = event.target.value;
      this.props.getMessage(userMessage);
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder = "Username" onKeyPress = {(keypress) => this.handleUserName(keypress)} />
        <input className="chatbar-message" placeholder = "Type Your Message Here" onKeyPress = {(keypress) => this.handleUserMessage(keypress)}/>
      </footer>
    )
  }
}

export default ChatBar;