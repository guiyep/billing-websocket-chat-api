Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getAllMessagesForClient = exports.getAllMessagesForUser = exports.createNewConversation = exports.addMessage = void 0;

const _messagesTypes = _interopRequireDefault(require('./messagesTypes'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  const _arr = [];
  let _n = true;
  let _d = false;
  let _e;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i.return != null) _i.return();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

const endOfConversationMessage = {
  message: '---- conversation finished ----',
  type: _messagesTypes.default.client,
};
const data = {
  'THIS-IS-AN-ACCOUNT-ID': [
    {
      message: 'this is a user message',
      type: _messagesTypes.default.user,
    },
    {
      message: 'this is a user message',
      type: _messagesTypes.default.client,
    },
  ],
};

const addMessage = function addMessage() {};

exports.addMessage = addMessage;

const createNewConversation = function createNewConversation() {};

exports.createNewConversation = createNewConversation;

const getAllMessagesForUser = function getAllMessagesForUser(accountId) {
  if (!data[accountId]) {
    return [];
  }

  return data[accountId].concat(endOfConversationMessage);
};

exports.getAllMessagesForUser = getAllMessagesForUser;

const getAllMessagesForClient = function getAllMessagesForClient() {
  return Object.entries(data).map((_ref) => {
    const _ref2 = _slicedToArray(_ref, 2);
    const accountId = _ref2[0];
    const messages = _ref2[1];

    return {
      accountId,
      messages,
    };
  });
};

exports.getAllMessagesForClient = getAllMessagesForClient;
// # sourceMappingURL=messages.js.map
