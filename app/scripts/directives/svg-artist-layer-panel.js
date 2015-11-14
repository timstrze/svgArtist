'use strict';

/**
 * @ngdoc directive
 * @name svgArtistApp.directive:svg-artist-layer-panel
 * @element svg-artist-tools
 * @restrict E
 *
 * @description
 * # svgArtistTools
 * Directive
 *
 * @param {Array} data Array of Data
 */

angular.module('svgArtistApp')
    .directive('svgArtistLayerPanel', function () {
      return {
        templateUrl: 'views/directives/svg-artist-layer-panel.html',
        restrict: 'E',
        link: function postLink($scope, $element) {



        }
      };
    });
