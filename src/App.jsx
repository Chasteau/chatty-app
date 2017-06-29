import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message:[],
      currentUser: {name: "" }
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

    let newMessage = this.state.message;
    // Recieve response from server
    this.ws.onmessage = (serverResponse) => {
        //push new responses into messages array
        newMessage.push(JSON.parse(serverResponse.data));
        //set the new state to be new messages
        this.setState({
          message: newMessage
        });
    }
  }

  _sendMessageToServer = (msg) => {
    this.ws.send(JSON.stringify(msg));
  }

  _getCurrentUser = (event) => {
    if(event.key === 'Enter' && event.target.value.length > 1) {
      this.state.currentUser.name = event.target.value;
    } else {
      this.state.currentUser.name = "Anonymous";
    }
  }

  _getUserMessage = (event) => {
    if(event.key === 'Enter' && event.target.value.length > 1) {
      let newMessage = {username: this.state.currentUser.name, content: event.target.value};
      this._sendMessageToServer(newMessage);
    }
  }

  render() {
    return (
       <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <ChatBar getUserMessage = {this._getUserMessage} getUser = {this._getCurrentUser} />
        <MessageList messages = {this.state.message} />
      </div>
    );
  }
}

export default App;
