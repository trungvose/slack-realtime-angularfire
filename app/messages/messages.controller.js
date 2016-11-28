(function () {
  'use strict';

  angular
      .module('app')
      .controller('messagesController', messagesController);

  messagesController.$inject = ['requireDisplayName', 'channelName', 'messages'];

  function messagesController(requireDisplayName, channelName, messages) {
    var messagesCtrl = this;

    messagesCtrl.messages = messages;
    messagesCtrl.channelName = channelName;

    messagesCtrl.message = '';

    messagesCtrl.sendMessage = sendMessage;

    function sendMessage() {
      if (messagesCtrl.message.length > 0) {
        messagesCtrl.messages.$add({
          uid: requireDisplayName.$id,
          body: messagesCtrl.message,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(function () {
          messagesCtrl.message = '';
        });
      }
    };

  }
})();
