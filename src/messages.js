import messageTypes from './messagesTypes';

const endOfConversationMessage = {
  message: '---- conversation finished ----',
  type: messageTypes.client,
};

const data = {
  'THIS-IS-AN-ACCOUNT-ID': [
    {
      message: 'this is a user message',
      type: messageTypes.user,
    },
    {
      message: 'this is a user message',
      type: messageTypes.client,
    },
  ],
};

export const addMessage = () => {};

export const createNewConversation = () => {};

export const getAllMessagesForUser = (accountId) => {
  if (!data[accountId]) {
    return [];
  }

  return data[accountId].concat(endOfConversationMessage);
};

export const getAllMessagesForClient = () =>
  Object.entries(data).map(([accountId, messages]) => ({ accountId, messages }));
