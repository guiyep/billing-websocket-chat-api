import WebSocket from 'ws';
import http from 'http';
import { addMessage, getAllMessagesForClient, getAllMessagesForUser } from './messages';
import messageTypes from './messagesTypes';

const server = http.createServer();
const PORT = 8080;

const wss = new WebSocket.Server({ server });

const sendMessage = (ws, data, accountId, name) => {
  const result = JSON.stringify({ accountId, name, data });
  console.log(`SENDING - ${result}`);
  ws.send(result);
};

const getMessage = (msg) => {
  console.log(`RECEIVED - ${msg}`);
  const parsedMessage = JSON.parse(msg);
  return parsedMessage;
};

const broadcastMessage = (ws, data, accountId, name, sameOrigin) => {
  wss.clients.forEach((client) => {
    if ((sameOrigin || client !== ws) && client.readyState === WebSocket.OPEN) {
      console.log(`BROADCASTING - messaging to ${accountId} ${name}`);
      sendMessage(client, data, accountId, name);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('CONNECTION - Someone is connected to the WEBSOCKET');

  ws.on('message', (msg) => {
    if (msg) {
      const parseMessage = getMessage(msg);

      if (parseMessage.name == 'CONNECT-ACCOUNT') {
        const accountId = parseMessage.message;
        sendMessage(ws, getAllMessagesForUser(accountId), accountId, 'ACCOUNT-CONNECTED');
      }

      if (parseMessage.name == 'GET-ALL-MESSAGES-CLIENT') {
        sendMessage(ws, getAllMessagesForClient(), '', 'GET-ALL-MESSAGES-CLIENT-SUCCEEDED');
      }

      if (parseMessage.name == 'ADD-MESSAGE') {
        const accountId = parseMessage.accountId;
        const messageAdded = addMessage(accountId, parseMessage);
        broadcastMessage(ws, [messageAdded], accountId, 'NEW-MESSAGE-ADDED');
        broadcastMessage(ws, getAllMessagesForClient(), '', 'GET-ALL-MESSAGES-CLIENT-SUCCEEDED', true);
      }
    }
  });
});

server.listen(PORT);

console.log(`listening ws://localhost:8080`);
