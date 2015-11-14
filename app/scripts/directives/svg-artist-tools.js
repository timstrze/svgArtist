'use strict';

/**
 * @ngdoc directive
 * @name svgArtistApp.directive:svg-artist-tools
 * @element svg-artist-layer-panel
 * @restrict E
 *
 * @description
 * # svgArtistTools
 * Directive
 *
 * @param {Array} data Array of Data
 */

angular.module('svgArtistApp')
    .directive('svgArtistTools', function () {
      return {
        templateUrl: 'views/directives/svg-artist-tools.html',
        restrict: 'E',
        scope: {
          settings: '=',
          svgInstance: '='
        }
      };
    });
