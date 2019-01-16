var MessagesView = {
  $chats: $('#chats'),

  initialize: function(data) {
    // MessagesView.updateMessages(data);
  },

  render: function() {
    if (Messages.currentMessages.length) {
      let start = 0;
      if (Messages.mostRecentMessageID !== null) {
        start =
          Messages.currentMessages.find(
            msg => msg.objectId === Messages.mostRecentMessageID
          ) + 1;
      }
      for (let i = start; i < Messages.currentMessages.length; i++) {
        MessagesView.renderMessage(Messages.currentMessages[i]);
      }
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
