var MessagesView = {
  $chats: $('#chats'),

  initialize: function() {
    MessagesView.updateMessages();
    // Parse.readAll(data => {
    //   data.results.reverse();
    //   data.results.forEach(message => {
    //     Messages.messageStore.push(message);
    //   });
    //   MessagesView.render();
    // });
  },

  render: function() {
    for (let i = Messages.renderCount; i < Messages.messageStore.length; i++) {
      MessagesView.renderMessage(Messages.messageStore[i]);
    }
    Messages.renderCount = Messages.messageStore.length;
  },

  updateMessages: function() {
    // fetch all the data from the server
    Parse.readAll(data => {
      // reverse order of fetched data so that oldest comes first
      data.results.reverse();
      for (let i = 0; i < data.results.length; i++) {
        // if the message cache does not have new message, add to cache
        let message = data.results[i];
        if (MessagesView.isNotInMessageStore(message)) {
          Messages.messageStore.push(message);
        }
      }
      // render messages
      MessagesView.render();
    });
  },

  isNotInMessageStore: function(targetMessage) {
    return !Boolean(
      Messages.messageStore.filter(
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
