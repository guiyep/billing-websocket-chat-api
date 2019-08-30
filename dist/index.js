const _ws = _interopRequireDefault(require('ws'));

const _http = _interopRequireDefault(require('http'));

const _messages = require('./messages');

const _messagesTypes = _interopRequireDefault(require('./messagesTypes'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const server = _http.default.createServer();

const PORT = 8080;
const wss = new _ws.default.Server({
  server,
});

const sendMessage = function sendMessage(ws, data, accountId, name) {
  const result = JSON.stringify({
    accountId,
    name,
    data,
  });
  console.log('SENDING - '.concat(result));
  ws.send(result);
};

const getMessage = function getMessage(msg) {
  console.log('RECEIVED - '.concat(msg));
  const parsedMessage = JSON.parse(msg);
  return parsedMessage;
};

const broadcastMessage = function broadcastMessage(ws, data, accountId, name, sameOrigin) {
  wss.clients.forEach((client) => {
    if ((sameOrigin || client !== ws) && client.readyState === _ws.default.OPEN) {
      console.log('BROADCASTING - messaging to '.concat(accountId, ' ').concat(name));
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
        sendMessage(ws, (0, _messages.getAllMessagesForUser)(accountId), accountId, 'ACCOUNT-CONNECTED');
      }

      if (parseMessage.name == 'GET-ALL-MESSAGES-CLIENT') {
        sendMessage(ws, (0, _messages.getAllMessagesForClient)(), '', 'GET-ALL-MESSAGES-CLIENT-SUCCEEDED');
      }

      if (parseMessage.name == 'ADD-MESSAGE') {
        const _accountId = parseMessage.accountId;
        const messageAdded = (0, _messages.addMessage)(_accountId, parseMessage);
        broadcastMessage(ws, messageAdded, _accountId, 'NEW-MESSAGE-ADDED');
        broadcastMessage(ws, (0, _messages.getAllMessagesForClient)(), '', 'GET-ALL-MESSAGES-CLIENT-SUCCEEDED', true);
      }
    }
  });
});
server.listen(PORT);
console.log('listening ws://localhost:8080');
// # sourceMappingURL=index.js.map
