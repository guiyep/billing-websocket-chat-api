"use strict";

var _ws = _interopRequireDefault(require("ws"));

var _http = _interopRequireDefault(require("http"));

var _messages = require("./messages");

var _messagesTypes = _interopRequireDefault(require("./messagesTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = _http["default"].createServer();

var PORT = 8080;
var wss = new _ws["default"].Server({
  server: server
});

var sendMessage = function sendMessage(ws, data, accountId, name) {
  var result = JSON.stringify({
    accountId: accountId,
    name: name,
    data: data
  });
  console.log("SENDING - ".concat(result));
  ws.send(result);
};

var getMessage = function getMessage(msg) {
  console.log("RECEIVED - ".concat(msg));
  var parsedMessage = JSON.parse(msg);
  return parsedMessage;
};

var broadcastMessage = function broadcastMessage(ws, data, accountId, name) {
  wss.clients.forEach(function (client) {
    if (client !== ws && client.readyState === _ws["default"].OPEN) {
      console.log("BROADCASTING - messaging to ".concat(accountId, " ").concat(name));
      sendMessage(client, data, accountId, name);
    }
  });
};

wss.on('connection', function (ws) {
  console.log('CONNECTION - Someone is connected to the WEBSOCKET');
  ws.on('message', function (msg) {
    if (msg) {
      var parseMessage = getMessage(msg);

      if (parseMessage.name == 'CONNECT-ACCOUNT') {
        var accountId = parseMessage.message;
        sendMessage(ws, (0, _messages.getAllMessagesForUser)(accountId), accountId, _messagesTypes["default"].user);
      }

      if (parseMessage.name == 'GET-ALL-MESSAGES-CLIENT') {
        sendMessage(ws, (0, _messages.getAllMessagesForClient)(), '', _messagesTypes["default"].client);
      }

      if (parseMessage.name == 'ADD-MESSAGE') {
        var _accountId = parseMessage.message.accountId;
        var messageAdded = (0, _messages.addMessage)(_accountId, parseMessage);
        broadcastMessage(ws, messageAdded, _accountId, 'NEW-MESSAGE-ADDED');

        if (parseMessage.type === _messagesTypes["default"].client) {
          sendMessage(ws, (0, _messages.getAllMessagesForClient)(), _messagesTypes["default"].client);
        }
      }
    }
  });
});
server.listen(PORT);
console.log("listening ws://localhost:8080");
//# sourceMappingURL=index.js.map