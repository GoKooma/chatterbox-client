var RoomsView = {
  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function(data) {
    //Todo implement this
    RoomsView.$button.on('click', Rooms.add);

  },

  render: function() {},

  renderRoom: function(room) {
    RoomsView.$select.append(`<div>${room}</div>`);
  }
};
