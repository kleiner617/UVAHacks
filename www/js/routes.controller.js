/**
 * Created by owner on 3/26/17.
 */
/**
 * Created by owner on 3/25/17.
 */
angular.module('starter.controllers')

  .controller('RoutesCtrl', function($scope, $ionicModal, $cordovaGeolocation, Favorites, Routes) {


    $scope.routes= Routes.all();

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

