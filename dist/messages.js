Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getAllMessagesForClient = exports.getAllMessagesForUser = exports.addMessage = void 0;

const _messagesTypes = _interopRequireDefault(require('./messagesTypes'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  const keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter((sym) => Object.getOwnPropertyDescriptor(object, sym).enumerable);
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach((key) => {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach((key) => {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]')
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
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
      accountName: 'SOME Account 1',
    },
    {
      message: 'this is a client message',
      type: _messagesTypes.default.client,
      accountName: 'SOME Account 2',
    },
  ],
};

const addMessage = function addMessage(accountId, message) {
  if (!message.message || !message.type || !message.accountName) {
    console.log('ERROR - Invalid message');
  }

  if (!data[accountId]) {
    data[accountId] = [];
  }

  if (message.type === _messagesTypes.default.link) {
    data[accountId].push({
      type: message.type,
      accountId: message.accountId,
      accountName: message.accountName,
      message: 'screenshot received',
      data: message,
    });
    return message;
  }

  data[accountId].push(message);
  console.log(data);
  return message;
}; // export const createNewConversation = () => {};

exports.addMessage = addMessage;

const getAllMessagesForUser = function getAllMessagesForUser(accountId) {
  if (!data[accountId]) {
    return [];
  }

  return data[accountId].concat(endOfConversationMessage);
};

exports.getAllMessagesForUser = getAllMessagesForUser;

const getAllMessagesForClient = function getAllMessagesForClient() {
  console.log('UPDATED: new messages collection '.concat(JSON.stringify(data)));
  return Object.entries(data).reduce((acc, _ref) => {
    const _ref2 = _slicedToArray(_ref, 2);
    const accountId = _ref2[0];
    const messages = _ref2[1];

    acc.push.apply(
      acc,
      _toConsumableArray(
        messages.map((message) =>
          _objectSpread(
            {
              accountId,
            },
            message,
          ),
        ),
      ),
    );
    return acc;
  }, []);
};

exports.getAllMessagesForClient = getAllMessagesForClient;
// # sourceMappingURL=messages.js.map
