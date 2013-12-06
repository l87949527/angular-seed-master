'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive("inlineEdit", function() {
        var editorTemplate =
            '<div>' +
               '<div ng-hide="view.editorEnabled">' +
                    '<div class="form-control col-sm-4"  ng-model="value" ng-mouseover="showEditOption(true)" ng-mouseout="showEditOption(false)" >' +
                    '{{value}}' +
                    '<a  ng-click="enableEditor()"  class="pull-right underline" ng-show="view.showEdit">Edit</a> </div>' +
               '</div>' +
               '<div ng-show="view.editorEnabled" >' +
                    '<input class="form-control col-sm-4" ng-model="view.editableValue" />' +
                    '<a   ng-click="save()" class="underline">Save</a>' +
                    ' or ' +
                    '<a   ng-click="disableEditor()" class="underline">cancel</a>.' +
               '</div>' +
            '</div>';

        return {
            restrict: "A",
            replace: true,
            template: editorTemplate,
            scope: {
                value: "=inlineEdit"

            },
            link: function(scope, element) {
                scope.$watch('view.editableValue', function(value) {
                        if (value != null)
                           element.find("input")[0].focus();

                });

            },

            controller: function($scope) {
                $scope.view = {
                    editableValue: null,
                    editorEnabled: false,
                    showEdit: false
                };


                $scope.enableEditor = function() {
                    $scope.view.editorEnabled = true;
                    $scope.view.editableValue = $scope.value;

                };

                $scope.disableEditor = function() {
                    $scope.view.editorEnabled = false;
                    $scope.view.editableValue = null;
                };

                $scope.save = function() {
                    $scope.value = $scope.view.editableValue;
                    $scope.disableEditor();
                    $scope.view.showEdit = false;
                    $scope.view.editableValue = null;

                };

                $scope.showEditOption = function(option) {
                    $scope.view.showEdit = option;

                }


            }
        }
    });