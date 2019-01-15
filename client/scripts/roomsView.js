var RoomsView = {
  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function(data) {
    //Todo implement this
    let $newRoomOption = $('<option>', {
      value: 'New Room...',
      text: 'New Room...'
    });
    let $allRoomsOption = $('<option>', {
      value: 'All Rooms',
      text: 'All Rooms'
    });
    RoomsView.$select.append($allRoomsOption);
    RoomsView.$select.append($newRoomOption);
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].roomname) {
        Rooms.addRoom(data.results[i].roomname);
      }
    }
    for (let room in Rooms.roomList) {
      RoomsView.$select.append(RoomsView.createRoomOption(room));
    }

    RoomsView.$select.change(RoomsView.changeRoom);
    RoomsView.render(data);

    // RoomsView.$select.RoomsView.$button.on('click', Rooms.add);
  },

  createRoomOption: function(roomName) {
    return $('<option>', {
      value: roomName,
      text: roomName
    });
  },

  changeRoom: async function(event) {
    let data = await Parse.readAll();
    MessagesView.clearMessages();
    RoomsView.render(data);
  },

  render: function(data) {
    MessagesView.updateMessages(data);
    let currentRoom = RoomsView.$select.find('option:selected').val();
    RoomsView.renderRoom(currentRoom);
    MessagesView.render();
  },

  renderRoom: function(roomName) {
    let msgs = [];
    for (let i = 0; i < Messages.allMessages.length; i++) {
      if (roomName && roomName !== 'All Rooms') {
        if (Messages.allMessages[i].roomname === roomName) {
          msgs.push(Messages.allMessages[i]);
        }
      } else if (
        Messages.allMessages[i].username &&
        Messages.allMessages[i].text
      ) {
        msgs.push(Messages.allMessages[i]);
      }
    }
    Messages.currentMessages = msgs;
  }
};
