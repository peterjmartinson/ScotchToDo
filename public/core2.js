/*
 * Scotch.io To Do app
 *
 * ./public/core2.js
 * Changed the $http methods to current standard
*/
 
var scotchTodo = angular.module('scotchTodo', []);

scotchTodo.controller('mainController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.formData = {};

    // when landing on a page, get all todos and show them
    $http.get('/api/todos')
      .then(function successCallback(res) {
          $scope.todos = res.data;
          console.log(res.data);
        }, function errorCallback(res) {
          console.log('Error: ' + res.data);
        });

    // when subitting the add form, send the text to the node API
    $scope.createTodo = function() {
      $http.post('/api/todos', $scope.formData)
        .then(function successCallback(res) {
          $scope.formData = {};
          $scope.todos = res.data;
          console.log(res.data);
        }, function errorCallback(res) {
          console.log('Error: ' + res.data);
        });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
      $http.delete('/api/todos/' + id)
        .then(function successCallback(res) {
          $scope.todos = res.data;
          console.log(res.data);
        }, function errorCallback(res) {
          console.log('Error: ' + res.data);
        });
    };

});

scotchTodo.controller('mainController', mainController);
