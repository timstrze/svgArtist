'use strict';

/**
 * @ngdoc overview
 * @name svgArtistApp
 * @description
 * # svgArtistApp
 *
 * Main module of the application.
 */
angular
  .module('svgArtistApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngMdIcons'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/svg-artist/demo', {
        templateUrl: 'views/demo/svg-artist.html',
        controller: 'DemoController',
        controllerAs: 'ctrl'
      });
  });



