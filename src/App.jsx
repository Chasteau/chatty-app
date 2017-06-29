import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message:[],
      currentUser: {name: "Anonymous" }
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
        //push new responses into messages array
        this.state.message.push(JSON.parse(serverResponse.data));
        //set the new state to be new messages
        this.setState({
          message: this.state.message
        });
    }
  }

  _sendMessageToServer = (msg) => {
    this.ws.send(JSON.stringify(msg));
  }

  _getCurrentUser = (userNameInput) => {
    this.state.currentUser.name = userNameInput;
    // this._sendMessageToServer(userNameInput);
  }

  _getUserMessage = (userMessageInput) => {
    console.log("user message:", userMessageInput);
      let newMessage = {username: this.state.currentUser.name, content: userMessageInput};
      this._sendMessageToServer(newMessage);
    }

  render() {
    return (
       <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <ChatBar getMessage={this._getUserMessage} getUser={this._getCurrentUser} />
        <MessageList messages={this.state.message} />
      </div>
    );
  }
}

export default App;
