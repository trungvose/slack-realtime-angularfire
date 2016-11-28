(function () {
  'use strict';

  angular
      .module('app')
      .factory('authFactory', authFactory);

  authFactory.$inject = ['$firebaseAuth'];

  function authFactory($firebaseAuth) {
    var auth = $firebaseAuth();

    return auth;
  }
})();