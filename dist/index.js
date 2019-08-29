const _ws = _interopRequireDefault(require('ws'));

const _http = _interopRequireDefault(require('http'));

const _messages = require('./messages');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const server = _http.default.createServer();

const PORT = 8080;
const wss = new _ws.default.Server({
  server,
});

const sendMessage = function sendMessage(ws, data) {
  const result = JSON.stringify(data);
  console.log('SENDING '.concat(result));
  ws.send(result);
};

const getMessage = function getMessage(msg) {
  console.log('RECEIVED '.concat(msg));
  const parsedMessage = JSON.parse(msg);
  return parsedMessage;
};

wss.on('connection', (ws, req) => {
  console.log('we are connected!!!');
  ws.on('message', (msg) => {
    if (msg) {
      const parseMessage = getMessage(msg);

      if (parseMessage.name == 'CONNECT-ACCOUNT') {
        sendMessage(ws, (0, _messages.getAllMessagesForUser)(parseMessage.message));
      }

      if (parseMessage.name == 'GET-ALL-MESSAGES-CLIENT') {
        sendMessage(ws, (0, _messages.getAllMessagesForClient)(parseMessage.message));
      }
    }
  });
});
server.listen(PORT);
console.log('listening ws://localhost:8080');
// # sourceMappingURL=index.js.map
