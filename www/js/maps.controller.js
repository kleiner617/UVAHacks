/**
 * Created by owner on 3/26/17.
 */

angular.module('starter.controllers')
  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, Routes) {

    // var testz = {'A': [38.037512,-78.515489, 'how you', 'how many yums'], 'B': [38.030211,-78.514395, 'chums', 'i eat all the yums'], 'C': [38.044171,-78.464699, 'taco tuesday', 'bring on the yums!'], 'D': [38.027574,-78.506327, 'jumbo', 'ony after rain']}
    $scope.routes = Routes;

    var allRoutes = $scope.routes.all();

    $scope.showNotificationPane = false;
    $scope.mapHalf = "100%";
    $scope.map;
    var options = {timeout: 10000, enableHighAccuracy: false};
    calcRoutes();

    function calcRoutes(){
      var allRoutes;
      setTimeout(function() {
        allRoutes = Routes.all();
        var coordinates = [];
        console.log(allRoutes[0].route);
        for(var l=0; l<allRoutes.length; l++){
          for(var i in allRoutes[0].route){
            coordinates.push{
              lat = allRoutes[0].route[i].coords.latitude;
              long = allRoutes[0].route[i].coords.longitude;
            }

          }
        }

        console.log(allRoutes.length);

      },3000);



    }


var data = {
  "snappedPoints": [
    {
      "location": {
        "latitude": -35.2784167,
        "longitude": 149.1294692
      },
      "originalIndex": 0,
      "placeId": "ChIJoR7CemhNFmsRQB9QbW7qABM"
    },
    {
      "location": {
        "latitude": -35.280321693840129,
        "longitude": 149.12908274880189
      },
      "originalIndex": 1,
      "placeId": "ChIJiy6YT2hNFmsRkHZAbW7qABM"
    },
    {
      "location": {
        "latitude": -35.2803415,
        "longitude": 149.1290788
      },
      "placeId": "ChIJiy6YT2hNFmsRkHZAbW7qABM"
    },
    {
      "location": {
        "latitude": -35.2803415,
        "longitude": 149.1290788
      },
      "placeId": "ChIJI2FUTGhNFmsRcHpAbW7qABM"
    },
    {
      "location": {
        "latitude": -35.280451499999991,
        "longitude": 149.1290784
      },
      "placeId": "ChIJI2FUTGhNFmsRcHpAbW7qABM"
    },
    {
      "location": {
        "latitude": -35.2805167,
        "longitude": 149.1290879
      },
      "placeId": "ChIJI2FUTGhNFmsRcHpAbW7qABM"
    },
    {
      "location": {
        "latitude": -35.2805901,
        "longitude": 149.1291104
      },
      "placeId": "ChIJI2FUTGhNFmsRcHpAbW7qABM"
    },
    {
      "location": {
        "latitude": -35.2805901,
        "longitude": 149.1291104
      },
      "placeId": "ChIJW9R7smlNFmsRMH1AbW7qABM"
    },
    {
      "location": {
        "latitude": -35.280734599999995,
        "longitude": 149.1291517
      },
      "placeId": "ChIJW9R7smlNFmsRMH1AbW7qABM"
    },
    {
      "location": {
        "latitude": -35.2807852,
        "longitude": 149.1291716
      },
      "placeId": "ChIJW9R7smlNFmsRMH1AbW7qABM"
    },
    {
      "location": {
        "latitude": -35.2808499,
        "longitude": 149.1292099
      },
      "placeId": "ChIJW9R7smlNFmsRMH1AbW7qABM"
    },
    {
      "location": {
        "latitude": -35.280923099999995,
        "longitude": 149.129278
      },
      "placeId": "ChIJW9R7smlNFmsRMH1AbW7qABM"
    },
    {
      "location": {
        "latitude": -35.280960897210818,
        "longitude": 149.1293250692261
      },
      "originalIndex": 2,
      "placeId": "ChIJW9R7smlNFmsRMH1AbW7qABM"
    },
    {
      "location": {
        "latitude": -35.284728724835304,
        "longitude": 149.12835061713685
      },
      "originalIndex": 7,
      "placeId": "ChIJW5JAZmpNFmsRegG0-Jc80sM"
    }
  ]
};


$cordovaGeolocation.getCurrentPosition(options).then(function(position){

  var startLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var startLatLngBoth = [position.coords.latitude, position.coords.longitude];

  var mapOptions = {
    center: startLatLng,
    zoom: 10,
    mapTypeId: 'terrain'
  };
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);


  var flightPlanCoordinates = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap($scope.map);




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







