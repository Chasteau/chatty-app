import React, {Component} from 'react';

class Message extends Component {
  render() {
    const {username, content, notify, type} = this.props;

    if (type === "incomingMessage") {
      return (
       <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
      )
    } else if (type === "incomingNotification") {
        return (
          <div className="message system">
            {notify}
          </div>
        )
    }
  }
}
export default Message;
