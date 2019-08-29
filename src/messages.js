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
      accountName: 'SOME Account 1',
    },
    {
      message: 'this is a client message',
      type: messageTypes.client,
      accountName: 'SOME Account 2',
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
  Object.entries(data).reduce((acc, [accountId, messages]) => {
    acc.push(
      ...messages.map((message) => ({
        accountId,
        ...message,
      })),
    );

    return acc;
  }, []);
