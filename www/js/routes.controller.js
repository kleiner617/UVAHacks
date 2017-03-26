/**
 * Created by owner on 3/26/17.
 */
/**
 * Created by owner on 3/25/17.
 */
angular.module('starter.controllers')

  .controller('RoutesCtrl', function($scope, $ionicModal, $cordovaGeolocation, Favorites) {

    //TOOD: Need to get actual favorites from database!


    $scope.routes= [{numStops: "Place 1", date: "This is the description!", numMiles: "Place 1", time: ["Food", "Historical Landmark"]},
      {numStops: "Place 2", date: "This is the description!", numMiles: "Location 2", time: ["Food", "Historical Landmark"]},
      {numStops: "Place 3", date: "This is the description!", numMiles: "Location 3", time: ["Food", "Historical Landmark"]},
      {numStops: "Place 4", date: "This is the description!", numMiles: "Location 4", time: ["Food", "Historical Landmark"]},
      {numStops: "Place 5", date: "This is the description!", numMiles: "Location 5", time: ["Food", "Historical Landmark"]},
      {numStops: "Place 6", date: "This is the description!", numMiles: "Place 6", time: ["Food", "Historical Landmark"]}];

    // $scope.routes = Favorites.all();

    $scope.selectedRoute={};

    $scope.deleteItem = function (item) {
      // Favorites.delete(item);
      $scope.routes.splice($scope.routes.indexOf(item), 1);
    }

    //Viewing Favorites Modal
    $ionicModal.fromTemplateUrl('templates/routes/view-route.html', {
      id: 'viewRoute',
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.viewModal = modal;
    });

    $scope.openModal = function(route) {
      $scope.selectedRoute = route;
      $scope.viewModal.show();
    };

    $scope.closeModal = function() {
      $scope.viewModal.hide();
      $scope.$on('$destroy', function () {
        $scope.viewModal.remove();
      });
    }

    $scope.saveInput = function(){
      //TODO: get categories as well to save!

      // Favorites.add({
      //   name: $scope.input.name,
      //   description: $scope.input.description,
      //   location: $scope.input.location,
      //   categories: ["cool", 'great', 'awesome']
      // });
      $scope.closeModal();

    }


  });

