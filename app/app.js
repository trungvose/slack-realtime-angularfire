'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(routeConfig)

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider']

function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      'requireNoAuth': requireNoAuth
    })
    .state('login', {
      url: '/login',
      controller: 'authController as authCtrl',
      templateUrl: 'auth/login.html',
      resolve: {
        'requireNoAuth': requireNoAuth
      }
    })
    .state('register', {
      url: '/register',
      controller: 'authController as authCtrl',
      templateUrl: 'auth/register.html',
      resolve: {
        'requireNoAuth': requireNoAuth
      }
    })
    .state('profile', {
      url: '/profile',
      controller: 'profileController as profileCtrl',
      templateUrl: 'users/profile.html',
      resolve: {
        'auth': auth,
        'profile': profile
      }
    })
    .state('channels', {
      url: '/channels',
      controller: 'channelsController as channelsCtrl',
      templateUrl: 'channels/index.html',
      resolve: {
        'requireDisplayName': requireDisplayName,
        'channels': channels
      }
    })
    .state('channels.create', {
      url: '/create',
      templateUrl: 'channels/create.html',
      controller: 'channelsController as channelsCtrl'
    })
    .state('channels.messages', {
      url: '/{channelId}/messages',
      controller: 'messagesController as messagesCtrl',
      templateUrl: 'messages/messages.html',
      resolve: {
        'messages': messages,
        'channelName': channelName
      }
    })
    .state('channels.direct', {
      url: '/{uid}/messages/direct',
      controller: 'messagesController as messagesCtrl',
      templateUrl: 'messages/messages.html',
      resolve: {
        'messages': userMessages,
        'channelName': messageName
      }
    })
  $urlRouterProvider.otherwise('/');

  requireNoAuth.$inject = ['$state', 'authFactory'];
  function requireNoAuth($state, authFactory) {
    return authFactory.$requireSignIn().then(function (auth) {
      $state.go('channels');
    }).catch(function (error) {
      return;
    });
  };

  auth.$inject = ['$state', 'usersFactory', 'authFactory'];
  function auth($state, usersFactory, authFactory) {
    return authFactory.$requireSignIn().catch(function () {
      $state.go('home');
    });
  };

  profile.$inject = ['usersFactory', 'authFactory'];
  function profile(usersFactory, authFactory) {
    return authFactory.$requireSignIn().then(function (auth) {
      console.log(auth.uid);
      return usersFactory.getProfile(auth.uid).$loaded()
    });
  };

  channels.$inject = ['channelsFactory'];
  function channels(channelsFactory) {
    return channelsFactory.$loaded();
  };

  requireDisplayName.$inject = ['$state', 'usersFactory', 'authFactory'];
  function requireDisplayName($state, usersFactory, authFactory) {
    return authFactory.$requireSignIn().then(function (auth) {
      return usersFactory.getProfile(auth.uid).$loaded().then(function (profile) {
        if (profile.displayName) {
          return profile;
        } else {
          $state.go('profile');
        }
      });
    }).catch(function (error) {
      $state.go('home');
    });
  };

  messages.$inject = ['$stateParams', 'messagesFactory'];
  function messages($stateParams, messagesFactory) {
    return messagesFactory.forChannel($stateParams.channelId).$loaded();
  };

  channelName.$inject = ['$stateParams', 'channelsFactory'];
  function channelName($stateParams, channelsFactory) {
    return '#' + channelsFactory.$getRecord($stateParams.channelId).name;
  };

  userMessages.$inject = ['$stateParams', 'messagesFactory', 'requireDisplayName'];
  function userMessages($stateParams, messagesFactory, requireDisplayName) {
    return messagesFactory.forUsers($stateParams.uid, requireDisplayName.$id).$loaded();
  };

  messageName.$inject = ['$stateParams', 'usersFactory'];
  function messageName($stateParams, usersFactory) {
    return usersFactory.all.$loaded().then(function () {
      return '@' + usersFactory.getDisplayName($stateParams.uid);
    });
  };

}
