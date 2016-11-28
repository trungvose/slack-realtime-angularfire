(function () {
  'use strict';

  angular
      .module('app')
      .factory('channelsFactory', channelsFactory);

  channelsFactory.$inject = ['$firebaseArray'];

  function channelsFactory($firebaseArray) {
    var ref = firebase.database().ref().child('channels');
    var channels = $firebaseArray(ref);

    return channels;
  }
})();