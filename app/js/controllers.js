'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('UserListCtrl', function($scope, dataService, $location) {
//        $scope.data = dataService.getUsers();

        //## callback handling
        /*dataService.getUsers(function(result) {
            $scope.data = result;
        });*/


        dataService.getUsers().then(function(data) {
                $scope.data = data;
                dataService.config.isShowPage = true;

//                $scope.$emit('dataCompleteEvent');
            }, function(status) {
                // error handling for the status
            });


        $scope.sortorder = "name";

        $scope.go = function ( person ) {
            console.log(person);
            var path = "/userDetail/" + person.id;
            $location.path( path );
        };

        $scope.hasSearchResult = function() {
            console.log($scope.matchedEntries.length + " matched entries");
            return $scope.matchedEntries.length >= 1;
        }


  })
    .controller('testGitBranch',['$scope',function($scope){
        //There is nothing!
        //test step1
        //test step2
        //test step3 child
    }])
  .controller('UserDetailCtrl', ['$scope', '$routeParams', 'dataService', function(s, r, d) {
        var selectedId = r.id;
        var user = d.getUserById(selectedId);
        s.person = user;
        s.$emit('handleGetUser',user);
  }])
  .controller('NewUserCtrl', function($scope,  dataService, $location, $window) {
        $scope.addUser = function() {
           var user = dataService.addUser($scope.name, $scope.occupation, $scope.hobby, $scope.email);
           //$location.path("/view1");
            $scope.$emit('handleGetUser', user);
            $window.history.back();
        }

  })
  .controller('MainCtrl', function($scope, dataService, $location) {
        $scope.config = dataService.config;

//        $scope.isShowPage = false;
//        $scope.$on('dataCompleteEvent',function(event){
//            $scope.isShowPage = true
//        });

        $scope.$on('handleGetUser', function(event, user){
            $scope.user = user;
        });

        $scope.summary = "Contact list";
        $scope.desc = "This is a place to describe what to do";

  });