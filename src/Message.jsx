import React, {Component} from 'react';

class Message extends Component {
  render() {
    const {username, content, notify} = this.props;
    return (

     <div className="message">
      <span className="message-username">{username}</span>
      <span className="message-content">{content}</span>
      <div className="message system">
        {notify}
      </div>
    </div>

    )
  }
}

export default Message;
     // <Notification notify = {message.notification}/>
