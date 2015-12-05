'use strict';

/**
 * @ngdoc function
 * @name svgArtistApp.controller:MainController
 * @description
 * # MainController
 * Controller of the svgArtistApp
 */
angular.module('svgArtistApp')
  //.config(function($mdIconProvider) {
  //  $mdIconProvider
  //    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  //})

  .controller('DemoController', function($mdDialog, $mdSidenav, $log, SvgArtist) {

    this.close = function (type) {
      $mdSidenav(type).close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };

    this.settings = {showLine: true, showText: true, showSave: true};

    this.svgArtistDemo = new SvgArtist({target: '.svg-artist-demo'});


    //this.settings = {
    //  printLayout: true,
    //  showRuler: true,
    //  showSpellingSuggestions: true,
    //  presentationMode: 'edit'
    //};

    this.sampleAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .content('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );
    };



    /**
     * @ngdoc function
     * @name MainController.init
     * @module Main
     * @methodOf svgArtistApp.controller:MainController
     * @kind function
     *
     * @description
     * Initiates the controller
     *
     */
    this.init = function () {
      // Alerts the user
      //alert(1);
    };



    /**
     * @ngdoc function
     * @name MainController.clickButton
     * @module Main
     * @methodOf svgArtistApp.controller:MainController
     * @kind function
     *
     * @description
     * Alerts user after clicking button
     *
     * @returns {Object} Returns event Object
     *
     */
    this.clickButton = function (event) {
      // Alerts the user
      alert(1);
      return event;
    };



    ///**
    // * @ngdoc function
    // * @name MainController.loader_show
    // * @module Main
    // * @eventOf svgArtistApp.controller:MainController
    // * @kind event
    // *
    // * @description
    // * Watching the loading flag for true.
    // *
    // */
    //$scope.$on('loader_show', function () {
    //  $scope.isLoading = true;
    //});
    //
    //
    //
    //
    ///**
    // * @ngdoc function
    // * @name MainController.loader_hide
    // * @module Main
    // * @eventOf svgArtistApp.controller:MainController
    // * @kind event
    // *
    // * @description
    // * Watching the loading flag for false.
    // *
    // */
    //$scope.$on('loader_hide', function () {
    //  $scope.isLoading = false;
    //});




    /**
     * @description
     * Initiates the controller.
     *
     */
    this.init();

  });
