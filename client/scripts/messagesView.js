var MessagesView = {
  $chats: $('#chats'),
  unreadCount: 0,

  initialize: function(data) {
    // MessagesView.updateMessages(data);
  },

  render: function() {
    if (Messages.currentMessages.length) {
      let start = 0;
      if (Messages.mostRecentMessageID !== null) {
        start =
          Messages.currentMessages.findIndex(
            msg => msg.objectId === Messages.mostRecentMessageID
          ) + 1;
      }
      let newMessageCount = 0;
      console.log(Messages.currentMessages);
      console.log(start);
      console.log(Messages.currentMessages[start]);
      for (let i = start; i < Messages.currentMessages.length; i++) {
        MessagesView.renderMessage(Messages.currentMessages[i]);
        newMessageCount++;
      }
      MessagesView.unreadCount += newMessageCount;
      Messages.mostRecentMessageID =
        Messages.currentMessages[Messages.currentMessages.length - 1].objectId;
    }
  },

  clearMessages: function() {
    MessagesView.$chats.empty();
    Messages.mostRecentMessageID = null;
  },

  isNewMessage: function(targetMessage) {
    return !Boolean(
      Messages.allMessages.filter(
        msg => msg.objectId === targetMessage.objectId
      ).length
    );
  },

  renderMessage: function(message) {
    let $message = $(MessageView.render(MessagesView.sanitizeMessage(message)));
    $message.find('.username').on('click', Friends.toggleStatus);
    MessagesView.$chats.prepend($message);
  },

  sanitizeMessage: function(dirtyMessage) {
    let sanitizedMessage = {};

    for (let key in dirtyMessage) {
      sanitizedMessage[key] = dirtyMessage[key];
    }

    sanitizedMessage.username = DOMPurify.sanitize(dirtyMessage.username);
    sanitizedMessage.text = DOMPurify.sanitize(dirtyMessage.text);

    return sanitizedMessage;
  }
};
