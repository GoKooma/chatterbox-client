var Rooms = {
  roomList: { },

  add: function(event) {
    let roomName = RoomsView.$select.val();
    Rooms.roomList[roomName] = true;
    RoomsView.$select.val('');
  }

};
