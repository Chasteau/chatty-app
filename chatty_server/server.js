// server.js

const express = require('express');
const SocketServer = require('ws').Server;
// Require uuid genertor
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


  // define Broadcast function
function broadcast(response) {
  wss.clients.forEach(function each(client) {
    if(client.readyState === client.OPEN) {
      client.send(response);
    }
  })
}

//Count the number of connected clients count
function clientCount () {
  return {type: "userCount", users: wss.clients.size};
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection (socket) {
  console.log('Client connected!');

  socket.on('message', function incoming (incomingData) {
    let type = JSON.parse(incomingData).type;
    let currentUser = JSON.parse(incomingData).username;
    let Message = JSON.parse(incomingData).content;
    let response;

    if (type === "postMessage") {
      response = {type:"incomingMessage", id: uuidv4(), username: currentUser, content: Message};
    } else if (type === "postNotification") {
      let oldUser = JSON.parse(incomingData).prevUser;
      let notify = oldUser + " has changed their name to " + currentUser;

      response = {type: "incomingNotification", id: uuidv4(), username: currentUser, content: null, notification: notify};
    } else if(type ===  "countUsers") {
      response = clientCount();
    }

    //Send broadcast to all connected
    broadcast(JSON.stringify(response));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', function disconect(client) {
    console.log('Client disconnected')
     //If client disconnects then send broadcast to all connected
    broadcast(JSON.stringify(clientCount()));
  });
});




