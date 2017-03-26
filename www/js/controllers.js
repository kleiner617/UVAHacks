angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, auth, store, $state, Favorites, Routes) {
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

  $scope.startTrip = function(){
    Routes.start();
    $state.go('tab.map', {});
  }
  $scope.stop = function(){
    Routes.stop();
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

.controller('SettingsCtrl', function($scope, auth, store, $state) {

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    store.remove('firebaseToken');
    $state.go('login', {});
  }

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


.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, Routes) {

  var testz = {'A': [38.037512,-78.515489, 'how you', 'how many yums'], 'B': [38.030211,-78.514395, 'chums', 'i eat all the yums'], 'C': [38.044171,-78.464699, 'taco tuesday', 'bring on the yums!'], 'D': [38.027574,-78.506327, 'jumbo', 'ony after rain']}
  $scope.routes = Routes;
  $scope.showNotificationPane = false;
  $scope.mapHalf = "100%";
  var options = {timeout: 10000, enableHighAccuracy: false};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var startLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var startLatLngBoth = [position.coords.latitude, position.coords.longitude];

    var mapOptions = {
      center: startLatLng,
      zoom: 15,
      mapTypeId: 'hybrid'
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var indexFavLocs;
    var lat1 = position.coords.latitude;
    var lon1 = position.coords.longitude;
    nearFavLocs = [];
    for (var key in testz)
    {
        var lat2 = testz[key][0];
        var lon2 = testz[key][1];
        var nowFavLocsLatLng = new google.maps.LatLng(lat2, lon2);
        testz[key][2] = nowFavLocsLatLng;
        console.log(testz[key][2]);
        // Start distance finder.
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2 - lat1) * (Math.PI / 180);
        var dLon = (lon2 - lon1) * (Math.PI / 180);
        var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * (Math.PI / 180) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        // End distance finder.
        if (d <= 5) // About 3.1 miles.
        {
            // google.maps.event.addListenerOnce($scope.map, 'idle', function(){
                (function(){
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        // animation: google.maps.Animation.DROP,
                        position: testz[key][2]
                    })
                        var infoWindow = new google.maps.InfoWindow({
                        content: testz[key][3]
                    })

                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.open($scope.map, marker);
                    });
                })();

        //   });
        };
    };

  }, function(error){
    console.log('Unable to grab user location.');
  });

  $scope.showNotification = function(){
  $scope.mapHalf = "50%";
    $scope.showNotificationPane = true;
  }
  $scope.hideNotification = function(){
  $scope.mapHalf = "100%";
    $scope.showNotificationPane = false;
  }
  $scope.notiStyle = function() {
  var style1 = "width: 100%; height: 100%;";
  var style2 = "height: 50%; width: 100%;";
  if(!$scope.showNotificationPane)
     return style1;
  else
     return style2;
}

});
