var App = {
  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: async function() {
    App.username = window.location.search.substr(10);
    App.startSpinner();
    let data = await Parse.readAll();
    console.log(data);
    FormView.initialize(data);
    RoomsView.initialize(data);
    MessagesView.initialize(data);
    App.stopSpinner();
  },

  fetch: function(callback = () => {}) {
    Parse.readAll(data => {
      // examine the response from the server request:
      console.log(data);

      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
