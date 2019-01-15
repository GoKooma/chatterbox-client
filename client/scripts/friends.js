var Friends = {
  friendList: {},

  toggleStatus: function(event) {
    let targetFriend = $(event.target).text();
    if (!Friends.friendList[targetFriend]) {
      Friends.friendList[targetFriend] = true;
      let users = Array.from($('#chats').find('.username'));
      users.forEach(user => {
        let $user = $(user);
        if ($user.text() === targetFriend) {
          $user.addClass('friend');
        }
      });
    } else {
      Friends.friendList[targetFriend] = false;
      let users = Array.from($('#chats').find('.username'));
      users.forEach(user => {
        let $user = $(user);
        if ($user.text() === targetFriend) {
          $user.removeClass('friend');
        }
      });
    }
  }
};
