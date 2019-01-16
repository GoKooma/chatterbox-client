var App = {
  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: async function() {
    App.username = window.location.search.substr(10);
    App.startSpinner();
    let data = await Parse.readAll();
    // console.log(data);
    await FormView.initialize(data);
    await RoomsView.initialize(data);
    await MessagesView.initialize(data);

    App.stopSpinner();
    setInterval(App.refresh, 5000);
  },

  refresh: async function() {
    App.startSpinner();
    await RoomsView.render();
    App.stopSpinner();
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
