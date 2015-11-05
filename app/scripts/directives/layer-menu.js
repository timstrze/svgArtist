'use strict';

/**
 * @ngdoc directive
 * @name svgArtistApp.directive:layer-menu
 * @element layer-menu
 * @restrict E
 *
 * @description
 * # layerMenu
 * Directive
 *
 * @param {Array} data Array of Data
 */

/*global d3 */

angular.module('svgArtistApp')
    .directive('layerMenu', function () {
      return {
        scope: {
          data: '='
        },
        template: '<div>test</div><div class="layer-menu"></div>',
        restrict: 'E',
        link: function postLink($scope, $element) {

          $scope.dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
            11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

          $scope.width = $element.parent().prop('offsetWidth');

          $scope.height = $element.parent().prop('offsetHeight');

          $scope.barPadding = 1;

          $scope.svg = d3.select($element[0].querySelector('.layer-menu'))
            //.selectAll("svg")
            .append("svg")
            .attr("width", $scope.width)
            .attr("height", $scope.height);


          /**
           * @ngdoc function
           * @name render
           * @methodOf svgArtistApp.directive:layer-menu
           *
           * @description
           * Renders the d3 visualization
           *
           */
          $scope.render = function () {

            $scope.svg.selectAll("rect")
              .data($scope.dataset)
              .enter()
              .append("rect")
              .attr("fill", function(d) {
                return "rgb(0, 0, " + (d * 10) + ")";
              })
              .attr("x", function(d, i) {
                return i * ($scope.width / $scope.dataset.length);
              })
              .attr("y", function(d) {
                return $scope.height - (d * 4);  //Height minus data value
              })
              .attr("width", $scope.width / $scope.dataset.length - $scope.barPadding)
              .attr("height", function(d) {
                return d * 4;
              });

          };



          /**
           * @ngdoc function
           * @name $watch
           * @eventOf svgArtistApp.directive:layer-menu
           *
           * @description
           * Watches the Array for changes and calls the render Function.
           *
           */
          $scope.$watch('data', function() {
            if($scope.data && $scope.data.length) {
              $scope.render();
            }
          }, true);

        }
      };
    });
