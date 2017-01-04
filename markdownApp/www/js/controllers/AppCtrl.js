angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SearchCtrl', function($scope, $http) {
  console.log('Doing Search');
  $scope.searchData = {};
  $scope.doSearch = function() {
    var req = {
      method : 'POST',
      url : 'http://ocsdemo.islandpacific.com:8090/ipmobile/mg_proxy.asp',
      headers:{
        'Content-Type' : 'application/xml',
      },
      data : '<?xml version="1.0" encoding="UTF-8"?><getsku s="00151" r="99"><msg sku="' + $scope.searchData.value + '"/></getsku>'
    };
    $http(req)
    .then(function(response) {
        $scope.searchData.result = response.data;
        console.log($scope.searchData.result);
        var XML = new DOMParser().parseFromString($scope.searchData.result, "text/xml");
        console.log(XML);
        var obj = parse(XML);
        console.log(obj);
    });


  };
})
