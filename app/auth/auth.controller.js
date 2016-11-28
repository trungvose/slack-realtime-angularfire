(function () {
  'use strict';

  angular
      .module('app')
      .controller('authController', auth);

  auth.$inject = ['authFactory', '$state'];

  function auth(authFactory, $state) {
    var authCtrl = this;
    authCtrl.user = {
      email: '',
      password: ''
    };
    authCtrl.loginLoading = false;
    authCtrl.registerLoading = false;

    authCtrl.login = login;
    authCtrl.register = register;

    function login() {
      authCtrl.loginLoading = true;
      authFactory.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (authData) {
        console.log('Logged in as: ', authData);
        $state.go('channels')
        //authCtrl.loginLoading = false;
      }).catch(function (error) {
        authCtrl.error = error;
        authCtrl.loginLoading = false;
        console.error('Authentication failed: ', error);
      })
    }

    function register() {
      authCtrl.registerLoading = true;
      authFactory.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (userData) {
        console.log('User ' + userData.uid + ' created successfully.');
        authCtrl.login();
        //authCtrl.registerLoading = false;
      }).catch(function (error) {
        authCtrl.error = error;
        authCtrl.registerLoading = false;
        console.error('Register failed: ', error);
      });
    }

  }
})();
