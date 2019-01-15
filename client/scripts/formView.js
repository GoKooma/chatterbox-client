var FormView = {
  $form: $('form'),

  initialize: function(data) {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: async function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    App.startSpinner();
    let message = {};
    message.username = App.username;
    message.roomname = RoomsView.$select.val();
    message.text = $('#message').val();
    await Parse.create(message);
    $('#message').val('');
    App.refresh();
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }
};
