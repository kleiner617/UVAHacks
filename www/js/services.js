angular.module('starter.services', ['firebase'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('Favorites', function($firebaseArray, store, $state, auth) {
  var name = "Favorites";

  var ref = new Firebase("https://auth0-ionic-sample.firebaseio.com/" + name);
  // ref.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
  //   if (error) {
  //     // There was an error logging in, redirect the user to login page
  //     debugger;
  //     $state.go('login');
  //   }
  // });

  // var ref = new firebaseAuth("https://auth0-ionic-sample.firebaseio.com");
  // ref.authWithPassword({
  //   "email": 'wunschelbs@vcu.edi',
  //   "password": 'password1'
  // }, function(error, auth) {
  //   if (error) {
  //     // There was an error logging in, redirect the user to login page
  //     debugger;
  //     $state.go('login');
  //   }
  // });

  var friends = $firebaseArray(ref);

  this.all = function() {
    return friends;
  };

  this.add = function(friend) {
    friend.user = auth.idToken;
    friends.$add(friend);
  };

  this.get = function(id) {
    return friends.$getRecord(id);
  };

  this.save = function(friend) {
    friends.$save(friend);
  };

  this.delete = function(friend) {
    friends.$remove(friend);
  };

})

.service('Routes', function($firebaseArray, store, $state, auth, $cordovaGeolocation) {
  var name = "Routes";

  var ref = new Firebase("https://auth0-ionic-sample.firebaseio.com/" + name);
  // ref.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
  //   if (error) {
  //     // There was an error logging in, redirect the user to login page
  //     debugger;
  //     $state.go('login');
  //   }
  // });

  // var ref = new firebaseAuth("https://auth0-ionic-sample.firebaseio.com");
  // ref.authWithPassword({
  //   "email": 'wunschelbs@vcu.edi',
  //   "password": 'password1'
  // }, function(error, auth) {
  //   if (error) {
  //     // There was an error logging in, redirect the user to login page
  //     debugger;
  //     $state.go('login');
  //   }
  // });

  var friends = $firebaseArray(ref);

  this.all = function() {
    return friends;
  };

  this.add = function(friend) {
    friends.$add(friend);
  };

  this.get = function(id) {
    return friends.$getRecord(id);
  };

  this.save = function(friend) {
    friends.$save(friend);
  };

  this.delete = function(friend) {
    friends.$remove(friend);
  };


  var timeout = null;
  var route = null;
  var startDate = null;
  var onRoute = false;
  var routeName = null;
  var geoLocOptions = {timeout: 10000, enableHighAccuracy: false};
  this.start = function(name){
    routeName = name;
    onRoute = true;
    route = [];
    startDate = new Date();
    (function loop(){
      $cordovaGeolocation.getCurrentPosition(geoLocOptions).then(function(position){
        route.push({
          timestamp: position.timestamp, 
          coords: {
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
          }});
        if(onRoute)
          timeout = setTimeout(loop, 1000);
      }, function(error){
        console.log('Could not get location');
      });
    })();
  }

  this.stop = function(name){
    onRoute = false;
    routeName = routeName || "";
    clearTimeout(timeout);
    this.add({
      name: routeName,
      user: auth.idToken,
      start: startDate.toISOString(),
      end: (new Date()).toISOString(),
      route: JSON.stringify(route)
    });
    routeName = null;//clear old name
  }

})
;
