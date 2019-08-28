import WebSocket from 'ws';
import http from 'http';
// import { addMessage, createNewConversation, getAllMessages } from './messages';
//const url = 'ws://localhost:8080'

const server = http.createServer();
const PORT = 8080;

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  console.log(req.connection.remoteAddress);

  ws.on('message', (message) => {
    console.log('RECEIVED: %s', message);
  });

  ws.send('CONNECTED');
});

server.listen(PORT);

console.log(`listening port ${PORT}, ws://localhost:8080`);
