import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:[
      {
        username: "David",
        content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, loser get some help!",
        }
      ],
      currentUser: {name: "David" },
  }

}

_handleEnter = (event) => {
  if(event.key === 'Enter') {
  const newMessage = {username: this.state.currentUser.name, content: event.target.value};
  const messages = this.state.message.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
  this.setState({
    message: messages
  });
}
}

// in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {username: "Michelle", content: "Hello there!"};
    const messages = this.state.message.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({message: messages})
  }, 3000);
}

  render() {
    return (
       <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar handleEnter = {this._handleEnter} name = {this.state.currentUser.name} />
        <MessageList messages = {this.state.message} />
      </div>
    );
  }
}
export default App;
