(function () {
  'use strict';

  angular
      .module('app')
      .controller('profileController', profileController);

  profileController.$inject = ['$state', 'md5', 'auth', 'profile'];

  function profileController($state, md5, auth, profile) {
    var profileCtrl = this;

    profileCtrl.updateProfile = updateProfile;
    profileCtrl.profile = profile;

    function updateProfile() {
      profileCtrl.profile.emailHash = md5.createHash(auth.email);
      profileCtrl.profile.$save().then(function () {
        $state.go('channels');
      });
    }
  }
})();
