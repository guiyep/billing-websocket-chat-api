import WebSocket from 'ws';
import http from 'http';
import { getAllMessagesForClient, getAllMessagesForUser } from './messages';

const server = http.createServer();
const PORT = 8080;

const wss = new WebSocket.Server({ server });

const sendMessage = (ws, data) => {
  const result = JSON.stringify(data);
  console.log(`SENDING ${result}`);
  ws.send(result);
};

const getMessage = (msg) => {
  console.log(`RECEIVED ${msg}`);
  const parsedMessage = JSON.parse(msg);
  return parsedMessage;
};

wss.on('connection', (ws, req) => {
  console.log('we are connected!!!');

  ws.on('message', (msg) => {
    if (msg) {
      const parseMessage = getMessage(msg);

      if (parseMessage.name == 'CONNECT-ACCOUNT') {
        sendMessage(ws, getAllMessagesForUser(parseMessage.message));
      }

      if (parseMessage.name == 'GET-ALL-MESSAGES-CLIENT') {
        sendMessage(ws, getAllMessagesForClient(parseMessage.message));
      }
    }
  });
});

server.listen(PORT);

console.log(`listening ws://localhost:8080`);
