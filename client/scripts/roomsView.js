var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
  },

  render: function() {
  },

  renderRoom: function(room) {
    RoomsView.$select.append(
      `<div>${room}</div>`
    );
  }
};
