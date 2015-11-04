'use strict';

/**
 * @ngdoc service
 * @name svgArtistApp.service:Layers
 * @description
 * # Layers
 * Factory that contains all the properties and methods for a Layers
 *
 */
angular.module('svgArtistApp')
  .factory('Layers', function ($resource) {

    var Layers = function (properties) {
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
     * @name Layers.http
     * @methodOf svgArtistApp.service:Layers
     *
     * @description
     * Public access to the GET, PUT, and POST methods
     *
     * @param {String} ID of the Layers
     */
    Layers.http = $resource('json/-layers.json/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET'
      }
    });


    return Layers;

  });
