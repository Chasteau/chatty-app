import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props) {
    super(props);

    this.ws = new WebSocket('ws://localhost:3001');

    this.state = {
      message:[],
      currentUser: {name: "David" },
    };
  }


_handleEnter = (event) => {
  if(event.key === 'Enter') {
  const newMessage = {username: this.state.currentUser.name, content: event.target.value};
  // const messages = this.state.message.concat(newMessage)

  // Send new message to the server
  this.ws.send(JSON.stringify(newMessage));
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
  // this.setState({
  //   message: messages
    // });
   }
  }

componentDidMount() {
  let newMessage = this.state.message;
  // Recieve response from server
  this.ws.addEventListener('message', (serverResponse) => {
      //push new responses into messages array
      newMessage.push(JSON.parse(serverResponse.data));
      // console.log("new message ==", newMessage[0]);
      //set the new state to be new messages
      this.setState({
    message: newMessage
    })
  })
}



// in App.jsx
// componentDidMount() {
//   console.log("componentDidMount <App />");


//   // // this.ws.onopen = function (event) {
//   // //   console.log("Connected to Server");
//   // // };


//   // setTimeout(() => {
//   //   // console.log("Simulating incoming message");
//   //   // Add a new message to the list of messages in the data store
//   //   const newMessage = {username: "Michelle", content: "Hello there!"};
//   //   const messages = this.state.message.concat(newMessage)
//   //   // Update the state of the app component.
//   //   // Calling setState will trigger a call to render() in App and all child components.
//   //   this.setState({message: messages})
//   // }, 3000);
// }

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
