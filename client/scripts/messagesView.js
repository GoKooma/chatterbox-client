var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    
    Parse.readAll(data => {
      data.results.forEach(message => {
        MessagesView.renderMessage(message);
      });
    });
  },

  render: function() {

  },

  renderMessage: function(message) {
    MessagesView.$chats.append(MessageView.render(MessagesView.sanitizeMessage(message)));
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