'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  factory('dataService1', function() {
        var nextID = 6;
        var data = {
            dataSet : [
                {
                    "id" : "0",
                    "name": "James Hoffman",
                    "occupation": "Teacher",
                    "hobby" : "Reading",
                    "email" : "james.hoffman@myapp.com"
                },
                {
                    "id": "1",
                    "name": "Simon Smith",
                    "occupation": "Salesman",
                    "hobby" : "Swimming",
                    "email": "simon.smith@myapp.com"
                },
                {
                    "id": "2",
                    "name": "Denis Webber",
                    "occupation": "Engineer",
                    "hobby" : "Football",
                    "email": "denis.webber@myapp.com"
                },
                {
                    "id": "3",
                    "name": "Sean Cyrus",
                    "occupation": "Cashier",
                    "hobby" : "Counting money",
                    "email": "sean.cyrus@myapp.com"
                },
                {
                    "id": "4",
                    "name": "Kathy Sanna",
                    "occupation": "Accountant",
                    "hobby" : "Reading",
                    "email": "kathy.sanna@myapp.com"
                },
                {
                    "id": "5",
                    "name": "Mauren Tomas",
                    "occupation": "Banker",
                    "hobby" : "Traveling",
                    "email": "mauren.tomas@myapp.com"
                }

            ]
        };

        return {

            getUsers : function() {
                return data;
            },

            addUser : function(name, occupation, hobby, email) {

                 data.dataSet.push({
                     "id" : nextID,
                     "name" : name,
                     "occupation" : occupation,
                     "hobby" : hobby,
                     "email" : email
                 })
                 nextID++;
            },

            getUserById : function(id) {
                var found = null;
                for (var i=0; i<data.dataSet.length; i++) {
                    if (data.dataSet[i].id == id) {
                        found = data.dataSet[i];
                        break;
                    }
                }
                return found;
            }
        }

  }).
  factory('cacheService2', function($cacheFactory) {
        var cache = $cacheFactory('cacheService', {
            capacity: 3
        });

        return cache;
    }).
    factory('dataService', function($http  ) {
        return {
            getUsers: function(callback) {

                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        url: '/app/data/data.json',
                        method: "GET"

                    }).success(function(data, status, headers, config) {
                        callback(data);
                    }).error(function(data, status, headers, config) {

                    });
            }
        }
    }).
    factory('dataService', function($http, $q) {
        var cachedData = null;
        return {
            config : {isShowPage:false},
            getUsers: function() {
                var deferred = $q.defer();

                if(cachedData){
                    deferred.resolve(cachedData);
                }else{
                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        url: '/app/data/data.json',
                        method: "GET"

                    }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                            cachedData = data;
                        }).error(function (data, status, headers, config) {
                            deferred.reject(status);
                        });
                }
                return deferred.promise;
            },
            addUser: function (name, occupation, hobby, email) {
                var user = {
                    "id": cachedData.dataSet.length,
                    "name": name,
                    "occupation": occupation,
                    "hobby": hobby,
                    "email": email
                };

                cachedData.dataSet.push(user);
                return user;
            },

            getUserById : function(id) {
                var found = null;
                if (!cachedData) return null;

                for (var i=0; i<cachedData.dataSet.length; i++) {
                    if (cachedData.dataSet[i].id == id) {
                        found = cachedData.dataSet[i];
                        break;
                    }
                }
                return found;
            }
        }
    });

