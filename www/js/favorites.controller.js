/**
 * Created by owner on 3/25/17.
 */
angular.module('starter.controllers')

  .controller('FavoritesCtrl', function($scope, $ionicModal, $cordovaGeolocation) {

    //TOOD: Need to get actual favorites from database!
    $scope.favorites= [{name: "Place 1", description: "This is the description!", location: "Place 1", categories: ["Food", "Historical Landmark"]},
      {name: "Place 2", description: "This is the description!", location: "Location 2", categories: ["Food", "Historical Landmark"]},
      {name: "Place 3", description: "This is the description!", location: "Location 3", categories: ["Food", "Historical Landmark"]},
      {name: "Place 4", description: "This is the description!", location: "Location 4", categories: ["Food", "Historical Landmark"]},
      {name: "Place 5", description: "This is the description!", location: "Location 5", categories: ["Food", "Historical Landmark"]},
      {name: "Place 6", description: "This is the description!", location: "Place 6", categories: ["Food", "Historical Landmark"]},
      {name: "Place 7", description: "This is the description!", location: "Place 7", categories: ["Food", "Historical Landmark"]},
      {name: "Place 8", description: "This is the description!", location: "Place 8", categories: ["Food", "Historical Landmark"]},
      {name: "Place 9", description: "This is the description!", location: "Place 9", categories: ["Food", "Historical Landmark"]}];

    $scope.input = {
      'name' : '',
      'description' : '',
      'location' : '',
      'categories' : []
    };

    $scope.groups = [];
    $scope.groups[0] = {
      name: "Categories",
      items: [],
      show: false
    };
    $scope.groups[0].items = ["Food", "Hikes", "Natural Wonder", "Famous Landmark", "Roadside Attraction"];

    $scope.selectedFav={};

    $scope.deleteItem = function (item) {
      console.log(item);
      $scope.favorites.splice($scope.favorites.indexOf(item), 1);
    }

    //New Favorites Modal
    $ionicModal.fromTemplateUrl('templates/favorites/add-favorites.html', {
      id: 'addFav', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.newModal = modal;
    });

    //Viewing Favorites Modal
    $ionicModal.fromTemplateUrl('templates/favorites/view-favorite.html', {
      id: 'viewFav',
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.viewModal = modal;
    });

    $scope.openModal = function() {
      $scope.newModal.show();
    };

    $scope.openModal2 = function(favorite) {
      $scope.selectedFav = favorite;
      console.log(favorite);
      console.log("BUUUUUGGGG");
      $scope.viewModal.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.newModal.hide();
      else $scope.viewModal.hide();
      // Cleanup the modals when we're done with them (i.e: state change)
      $scope.$on('$destroy', function () {
        $scope.viewModal.remove();
        $scope.newModal.remove();
      });
    }

    $scope.saveInput = function(){
      $scope.closeModal();
      var newFav={};
      newFav.name= $scope.input.name;
      newFav.description=$scope.input.description;
      newFav.location=$scope.input.description;

      //TODO: get categories as well to save!

      $scope.favorites.push(newFav);
    }

    $scope.toggleGroup = function(group) {
      group.show = !group.show;
    };
    $scope.isGroupShown = function(group) {

      return group.show;
    };

    $scope.getLocation = function(){
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      var lat, long;
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          lat  = position.coords.latitude
          long = position.coords.longitude

          var geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(lat, long);
          console.log(latlng);
          var request = {
            latLng: latlng
          };
          geocoder.geocode(request, function(data, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (data[0] != null) {
                console.log("address is: " + data[0].formatted_address);
              } else {
                console.log("No address available");
              }
            }
          })

        }, function(err) {
          // error
        });
      //TODO: Need to add location to field

    }




  });

