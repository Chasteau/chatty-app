import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {

      const {messages} = this.props;

      return (
          <main className="messages">
            {messages.map((message, i) => {
              return (
                  <Message key={i} username = {message.username} content = {message.content} />
                );
            })};
          </main>
        )
      }
}

export default MessageList;
