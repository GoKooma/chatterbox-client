var Parse = {
  server: `http://parse.${
    window.CAMPUS
  }.hackreactor.com/chatterbox/classes/messages`,

  create: function(message, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success:
        successCB ||
        function(data) {
          console.log(data);
        },
      error:
        errorCB ||
        function(error) {
          console.error('chatterbox: Failed to create message', error);
        }
    });
  },

  readAll: function(successCB, errorCB = null) {
    return $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json'
      // success: successCB,
      // error:
      //   errorCB ||
      //   function(error) {
      //     console.error('chatterbox: Failed to fetch messages', error);
      //   }
    });
  }
};
