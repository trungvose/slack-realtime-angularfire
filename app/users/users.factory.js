(function () {
  'use strict';

  angular
      .module('app')
      .factory('usersFactory', usersFactory);

  usersFactory.$inject = ['$firebaseArray', '$firebaseObject'];

  function usersFactory($firebaseArray, $firebaseObject) {
    var usersRef = firebase.database().ref().child('users');
    var connectedRef = firebase.database().ref('.info/connected');
    var users = $firebaseArray(usersRef);

    var Users = {
      getProfile: getProfile,
      getDisplayName: getDisplayName,
      getGravatar: getGravatar,
      setOnline: setOnline,
      all: users
    };

    function getProfile(uid) {
      return $firebaseObject(usersRef.child(uid));
    };

    function getDisplayName(uid) {
      return users.$getRecord(uid).displayName;
    };

    function getGravatar(uid) {
      var emailHash = users.$getRecord(uid) ? users.$getRecord(uid).emailHash : ''
      return 'https://www.gravatar.com/avatar/' + emailHash;
    };

    function setOnline(uid) {
      var connected = $firebaseObject(connectedRef);
      var online = firebase.database().ref('users/' + uid + '/online')

      connected.$watch(function () {
        if (connected.$value === true) {
          var con = online.push(true);
          con.onDisconnect().remove();
        }
      });
    };

    return Users;
  }
})();