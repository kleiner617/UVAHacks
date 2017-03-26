angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, auth, store, $state, Favorites) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    store.remove('firebaseToken');
    $state.go('login', {});
  }

  $scope.test = function(){
    console.log("TESTING!");
    Favorites.add({
      name: "The cool place",
      description: "with the awesome stuff",
      location:"666 Haven Drive, Richmond VA 23234",
      categories: ["cool", 'great', 'awesome']
    });
    var tmp = Favorites.all();
    console.log(tmp);
    if(tmp.length > 0){
      tmp[0].name = "BOO!";
      Favorites.save(tmp[0]);
      console.log(Favorites.get(tmp[0].$id));
      Favorites.delete(tmp[0]);
    }

  }
})

.controller('ChatsCtrl', function($scope, Chats, auth, store, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, auth, store, $state) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("LoginCtrl", function LoginCtrl($scope, auth, $state, store) {
  (function(){
    auth.signin({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      auth.getToken({
        api: 'firebase'
      }).then(function(delegation) {
        store.set('firebaseToken', delegation.id_token);
        $state.go('tab.home');
      }, function(error) {
        // Error getting the firebase token
      })
    }, function() {
      // Error callback
    });
  })();
})

;
