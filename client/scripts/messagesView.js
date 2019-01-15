var MessagesView = {
  $chats: $('#chats'),

  initialize: function(data) {
    // MessagesView.updateMessages(data);
  },

  render: function() {
    for (
      let i = Messages.renderCount;
      i < Messages.currentMessages.length;
      i++
    ) {
      MessagesView.renderMessage(Messages.currentMessages[i]);
    }
    Messages.renderCount = Messages.currentMessages.length;
  },

  updateMessages: async function(data) {
    // fetch all the data from the server
    if (data === undefined) {
      data = await Parse.readAll();
    }
    // reverse order of fetched data so that oldest comes first
    data.results.reverse();
    for (let i = 0; i < data.results.length; i++) {
      // if the message cache does not have new message, add to cache
      let message = data.results[i];
      if (MessagesView.isNewMessage(message)) {
        Messages.allMessages.push(message);
      }
    }
  },

  filterMessages: function(event) {
    MessagesView.$chats.empty();
    Messages.renderCount = 0;
    MessagesView.updateMessages();
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
