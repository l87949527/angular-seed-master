'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      console.log(text);
      return String(text).replace(/\%VERSION\%/mg, version);

    }
  }]).
  filter('matchedsearch', function() {
        return function (input, searchStr) {
            var searchPattern = "(" + searchStr + ")";
            var regEx = new RegExp(searchPattern, "i");
            var rtnValue =  input.replace(regEx, '<span class="highlight">$1</span>');
            console.log(rtnValue);
            return rtnValue;

        }
  });