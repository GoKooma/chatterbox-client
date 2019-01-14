var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {

  },

  render: function() {

  },

  renderMessage: function(message) {
    MessagesView.$chats.append(MessageView.render(message));
  }

};