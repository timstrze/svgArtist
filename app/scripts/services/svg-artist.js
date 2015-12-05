'use strict';

/**
 * @ngdoc service
 * @name svgArtistApp.service:SvgArtist
 * @description
 * # SvgArtist
 * Factory that contains all the properties and methods for a SvgArtist
 *
 */
angular.module('svgArtistApp')
  .factory('SvgArtist', function () {

    var SvgArtist = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Object
        _this[property] = properties[property];
      });

      this.svgContainer = d3.select(this.target);
      this.svgArtist = this.svgContainer.append('g').attr('name', 'svgArtist').attr('class', 'svg-artist');

      this.Layers = [];
    };


    SvgArtist.prototype.returnSvgItemName = function(svgItem) {
      return svgItem[0][0].nodeName;
    };



    /**
     * @ngdoc property
     * @name makeSelection
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.makeSelection = function() {

      this.selectItemActive = !this.selectItemActive;
    };



    return SvgArtist;

  });
