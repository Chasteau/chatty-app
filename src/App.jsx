import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // type, id, username, content
      messages:[],
      currentUser: {name: "Anonymous" },
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // create new websocket connection once compenent mounds
    this.ws = new WebSocket('ws://localhost:3001');

    //Open socket connection on once component mounds.
    this.ws.onopen = () =>{
      console.log("Connection to server")
    }

    // Recieve response from server
    this.ws.onmessage = (serverResponse) => {

      // Parse incoming server response
      const data = JSON.parse(serverResponse.data);
      switch(data.type) {

        case "incomingMessage":
        //push new datas into messages array
          this.state.messages.push(data);
           //set the new state to be new messagess
          this.setState({
            messages: this.state.messages
          });
          break;

        case "incomingNotification":
          //push new datas into messages array
          this.state.messages.push(data);
           //set the new state to be new messagess
          this.setState({
            messages: this.state.messages
          });
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  _sendMessageToServer = (msg) => {
    this.ws.send(JSON.stringify(msg));
  }

  _getCurrentUser = (userNameInput) => {
    let oldUser = this.state.currentUser.name;
    this.state.currentUser.name = userNameInput;
    let newUserNotification = {type: "postNotification", prevUser:oldUser, username: this.state.currentUser.name, content: ""};
    this._sendMessageToServer(newUserNotification);
  }

  _getUserMessage = (userMessageInput) => {
      let newMessage = {type: "postMessage", username: this.state.currentUser.name, content: userMessageInput};
      this._sendMessageToServer(newMessage);
    }

  render() {
    return (
       <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar getMessage={this._getUserMessage} getUser={this._getCurrentUser} />
      </div>
    );
  }
}

export default App;
