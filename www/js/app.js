// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'playthist.controllers', 'playthist.services', 'UserApp'])

.run(function($ionicPlatform, user) {
  user.init({appId: '55ccd9648bd70'});
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    data: {
      login: true
    }
  })

  .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    data: {
      public: true
    }
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'UserCtrl',
    data: {
      public: true
    }
  })

  .state('app.browse_sources', {
    url: "/browse_sources",
    views: {
      'menuContent': {
        templateUrl: "templates/browse_sources.html",
        controller: "BrowseSourceCtrl"
      },
      data: {
        public: true
      }
    }
  })

  .state('app.browse_options', {
    url: "/browse_options",
    views: {
      'menuContent': {
        templateUrl: "templates/browse_options.html"/*,
        controller: "BrowseCtrl"*/
      }
    }
  })

  .state('app.browse_playlists', {
    url: "/browse_playlists?listType&source",
    views: {
      'menuContent': {
        templateUrl: "templates/browse_playlists.html",
        controller: "BrowseCtrl"
      }
    }
  })

  .state('app.browse_tracks', {
    url: "/browse_tracks?listType&source&tracklistType&playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/browse_tracks.html",
        controller: "BrowseCtrl"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/user_playlists.html",
          controller: 'UserPlaylistsCtrl'
        }
      }
    })

  .state('app.playlist_tracks', {
    url: "/playlists/playlist_tracks?playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/user_playlist_tracks.html",
        controller: 'UserPlaylistTracksCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("app.browse_sources");
  }); //Needed to get around a bug where state is changed in a loop
});

var controllers = angular.module('playthist.controllers', []);
var services = angular.module('playthist.services', []);

//logging into soundcloud for testing purposes
var SOUNDCLOUD_CLIENT_ID = "d12ed0f6cd75e878fbbf665a06a2ca2b";