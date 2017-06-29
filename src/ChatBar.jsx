import React, {Component} from 'react';

class ChatBar extends Component {
    render() {

      const { getUserMessage, getUser } = this.props;

      return (

        <footer className="chatbar">
          <input className="chatbar-username" placeholder = "Username" onKeyPress = {(keypress) => getUser(keypress)} />
          <input className="chatbar-message" placeholder = "Type Your Message Here" onKeyPress = {(keypress) => getUserMessage(keypress)}/>
        </footer>
      )
    }
}

export default ChatBar;