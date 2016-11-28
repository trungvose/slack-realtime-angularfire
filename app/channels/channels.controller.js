(function () {
  'use strict';

  angular
      .module('app')
      .controller('channelsController', channelsController);

  channelsController.$inject = ['$state', 'authFactory', 'usersFactory', 'requireDisplayName', 'channels'];

  function channelsController($state, authFactory, usersFactory, requireDisplayName, channels) {
    var channelsCtrl = this;

    channelsCtrl.profile = requireDisplayName;
    channelsCtrl.channels = channels;
    channelsCtrl.users = usersFactory.all;

    channelsCtrl.getDisplayName = usersFactory.getDisplayName;
    channelsCtrl.getGravatar = usersFactory.getGravatar;

    channelsCtrl.logout = logout;
    channelsCtrl.createChannel = createChannel;

    channelsCtrl.newChannel = {
      name: ''
    };

    usersFactory.setOnline(requireDisplayName.$id);


    function logout() {
      channelsCtrl.profile.online = null;
      channelsCtrl.profile.$save().then(function () {
        authFactory.$signOut();
        $state.go('home');
      });
    };

    function createChannel() {
      channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function (ref) {
        $state.go('channels.messages', { channelId: ref.key });
        channelsCtrl.newChannel = {
          name: ''
        };
      });
    };

  }
})();
