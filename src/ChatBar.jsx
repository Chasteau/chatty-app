import React, {Component} from 'react';

class ChatBar extends Component {
    render() {

      const { handleEnter, name } = this.props;

      return (

        <footer className="chatbar">
          <input className="chatbar-username" placeholder = {name} />
          <input className="chatbar-message" placeholder = "Type Your Message Here" onKeyPress = {(keypress) => handleEnter(keypress)}/>
        </footer>
      )
    }
}

export default ChatBar;
