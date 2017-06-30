import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
    render() {

      const {messages} = this.props;

      console.log(messages);

      return (
        <main className="messages">
          {messages.map((message) => {
            return (
                <Message key={message.id} username = {message.username} content = {message.content} notify = {message.notification}/>
              )
          })}
        </main>

        )
      }
}

export default MessageList;
