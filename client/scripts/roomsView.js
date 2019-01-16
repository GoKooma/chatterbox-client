var RoomsView = {
  $button: $('#rooms button'),
  $select: $('#rooms select'),
  hasFocus: true,

  initialize: function(data) {
    //adds room options
    RoomsView.$select.append(RoomsView.optionConstructor('All Rooms'));
    RoomsView.$select.append(RoomsView.optionConstructor('New Room...'));
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].roomname) {
        Rooms.addRoom(data.results[i].roomname);
      }
    }
    for (let room in Rooms.roomList) {
      RoomsView.$select.append(RoomsView.optionConstructor(room));
    }
    //attaches changeroom event listener
    RoomsView.$select.change(RoomsView.changeRoom);

    RoomsView.render(data);
    RoomsView.$button.on('click', RoomsView.handleCreateNewRoom);

    $(window).on('focusout', RoomsView.showUnreadCount);
    $(window).on('focus', RoomsView.hideUnreadCount);
  },

  showUnreadCount: function(event) {
    console.log('showing unread');
    RoomsView.hasFocus = false;
    RoomsView.updateUnreadCount();
  },

  hideUnreadCount: function(event) {
    RoomsView.hasFocus = true;
    MessagesView.unreadCount = 0;
    RoomsView.updateUnreadCount();
  },

  updateUnreadCount: function() {
    if (RoomsView.hasFocus) {
      $('title').text('chatterbox');
    } else {
      $('title').text(`(${MessagesView.unreadCount}) chatterbox`);
    }
  },

  optionConstructor: function(roomName) {
    return $('<option>', {
      value: roomName,
      text: roomName
    });
  },

  handleCreateNewRoom: function(event) {
    let newRoomName = $('#new-room').val();
    Rooms.addRoom(newRoomName);
    RoomsView.$select.append(RoomsView.optionConstructor(newRoomName));
    $('#new-room').remove();
    $('#rooms select').val(newRoomName);
    RoomsView.changeRoom();
  },

  changeRoom: async function(event) {
    let currentRoom = RoomsView.$select.find('option:selected').val();
    if (currentRoom === 'New Room...') {
      let newInput = $('<input type="text" name="new-room" id="new-room">');
      $('#rooms select').after(newInput);
    } else {
      let data = await Parse.readAll();
      MessagesView.clearMessages();
      RoomsView.render(data);
    }
  },

  render: async function(data) {
    let currentRoom = RoomsView.$select.find('option:selected').val();
    await RoomsView.updateCurrentMessages(currentRoom);
    MessagesView.render();
    RoomsView.updateUnreadCount();
  },

  updateCurrentMessages: async function(roomName) {
    let fetched = await Parse.readRoom(roomName);
    if (fetched !== -1) {
      fetched.results.reverse();
      Messages.currentMessages = fetched.results;
    }
  }
};
