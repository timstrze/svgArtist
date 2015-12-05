'use strict';

/**
 * @ngdoc service
 * @name svgArtistApp.service:SvgArtistHistory
 * @description
 * # SvgArtistHistory
 * Factory that contains all the properties and methods for a SvgArtistHistory
 *
 */
angular.module('svgArtistApp')
  .factory('SvgArtistHistory', function () {

    var SvgArtistHistory = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Object
        _this[property] = properties[property];
      });
    };




    /**
     * @ngdoc function
     * @name SvgArtistHistory.undoAction
     * @methodOf svgArtistApp.service:SvgArtistHistory
     *
     * @description
     * Public access to the GET, PUT, and POST methods
     *
     */
    SvgArtistHistory.prototype.undoAction = function() {

      if(this.Layers.length > 0) {

        this.Layers[0].item.remove();

        this.Layers.shift();
      }
    };




    return SvgArtistHistory;

  });
