'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'pascalprecht.translate'
]).
config(['$routeProvider', '$translateProvider', function($routeProvider, $translateProvider) {
  $routeProvider.when('/userList', {templateUrl: 'partials/userList.html', controller: 'UserListCtrl'});
  $routeProvider.when('/userDetail/:id', {templateUrl: 'partials/userDetail.html', controller: 'UserDetailCtrl'});
  $routeProvider.when('/newUser', {templateUrl: 'partials/newUser.html', controller: 'NewUserCtrl'});
  $routeProvider.otherwise({redirectTo: '/userList'});
 

   $translateProvider.translations('en', {
    USER_NAME: 'Name',
    EMAIL: 'Email',
    OCCUPATION: 'Occupation',
    HOBBY: 'Hobby'
   })
   .translations('de', {
    USER_NAME: 'Naam',
    EMAIL: 'Emeil',
    OCCUPATION: 'OKKupation',
    HOBBY: 'Hebby'
  });
  $translateProvider.preferredLanguage('en');


}]); 