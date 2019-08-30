import messageTypes from './messagesTypes';

const endOfConversationMessage = {
  message: '---- conversation finished ----',
  type: messageTypes.client,
};

const data = {};

export const addMessage = (accountId, message) => {
  if (!message.message || !message.type || !message.accountName) {
    console.log('ERROR - Invalid message');
  }

  if (!data[accountId]) {
    data[accountId] = [];
  }

  if (message.type === messageTypes.link) {
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
};

// export const createNewConversation = () => {};

export const getAllMessagesForUser = (accountId) => {
  if (!data[accountId]) {
    return [];
  }

  return data[accountId].concat(endOfConversationMessage);
};

export const getAllMessagesForClient = () => {
  console.log(`UPDATED: new messages collection ${JSON.stringify(data)}`);
  return Object.entries(data).reduce((acc, [accountId, messages]) => {
    acc.push(
      ...messages.map((message) => ({
        accountId,
        ...message,
      })),
    );

    return acc;
  }, []);
};
