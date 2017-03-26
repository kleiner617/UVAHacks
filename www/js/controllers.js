angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: false};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var startLatLng = new google.maps.LatLng(43.07493,-89.381388);

    var mapOptions = {
      center: startLatLng,
      zoom: 15,
      mapTypeId: 'hybrid'
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  }, function(error){
    console.log('Could not get location');
  });
});
