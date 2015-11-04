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
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMessages',
    'LocalStorageModule',
    'ngMdIcons'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/routes/main.html',
        controller: 'MainController',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // Loading Interceptor
    //$httpProvider.interceptors.push('LoadingInterceptor');

  });



