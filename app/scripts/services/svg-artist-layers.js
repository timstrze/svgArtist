'use strict';

/**
 * @ngdoc service
 * @name svgArtistApp.service:SvgArtistLayers
 * @description
 * # Layers
 * Factory that contains all the properties and methods for a Layers
 *
 */
angular.module('svgArtistApp')
  .factory('SvgArtistLayers', function () {

    var SvgArtistLayers = function (properties) {
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
     * @name SvgArtistLayers.activateCreateLine
     * @methodOf stockTrackAngularJsApp.service:SvgArtistLayers
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLayers.prototype.createNewLayer = function() {

      this.Layers.unshift({
        name: 'Layer ' + this.Layers.length,
        specialItems: [],
        layer: this.svgArtist.append('g').attr('name', 'Layer ' + this.Layers.length).attr('class', 'layer'),
        svgItems: []
      });

      this.selectedLayer =  this.Layers[0];

    };



    /**
     * @ngdoc function
     * @name SvgArtistLayers.addLayerIfNone
     * @methodOf stockTrackAngularJsApp.service:SvgArtistLayers
     *
     * @description
     * Create layer if none exists.
     */
    SvgArtistLayers.prototype.addLayerIfNone = function () {
      if(!this.selectedLayer) {
        if(this.Layers.length === 0) {
          this.Layers.push({
            name: 'Layer 0',
            specialItems: [],
            layer: this.svgArtist.append('g').attr('name', 'Layer 0').attr('class', 'layer'),
            svgItems: []
          });
        }
        this.selectedLayer =  this.Layers[0];
      }
    };



    /**
     * @ngdoc property
     * @name SvgArtistLayers.selectLayer
     * @propertyOf stockTrackAngularJsApp.service:SvgArtistLayers
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLayers.prototype.selectLayer = function(layer) {
      this.selectedLayer = layer;
    };


    /**
     * @ngdoc property
     * @name SvgArtistLayers.selectItemsInLayer
     * @propertyOf stockTrackAngularJsApp.service:SvgArtistLayers
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLayers.prototype.selectItemsInLayer = function(selectedLayer) {

      this.selectedLayer = selectedLayer;

      angular.forEach(selectedLayer.svgItems, function(item) {

        var bbox = item.node().getBBox();

        var rect = selectedLayer.layer.append("svg:rect")
          .attr("x", bbox.x)
          .attr("y", bbox.y)
          .attr("width", bbox.width)
          .attr("height", bbox.height)
          .attr("name", "bounding-box")
          .attr("class", "bounding-box")
          .style("fill", "#ccc")
          .style("fill-opacity", ".3")
          .style("stroke", "#666")
          .style("stroke-width", "1.5px");

        selectedLayer.specialItems.unshift(rect);

      });

    };


    /**
     * @ngdoc property
     * @name SvgArtistLayers.deSelectItemsInLayer
     * @propertyOf stockTrackAngularJsApp.service:SvgArtistLayers
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLayers.prototype.deSelectItemsInLayer = function(layer) {

      this.selectedLayer = layer;

      //angular.forEach(layer.specialItems, function(specialItem) {
      //
      //  layer.specialItems.unshift(rect);
      //
      //});

    };


    /**
     * @ngdoc property
     * @name SvgArtistLayers.removeAllLayers
     * @propertyOf stockTrackAngularJsApp.service:SvgArtistLayers
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLayers.prototype.removeAllLayers = function() {
      angular.forEach(this.Layers, function(layer) {
        angular.forEach(layer.svgItems, function(item) {
          item.remove();
        });
        angular.forEach(layer.specialItems, function(item) {
          item.remove();
        });
      });

      this.Layers = [];

      this.selectedLayer = null;
    };


    /**
     * @ngdoc property
     * @name SvgArtistLayers.removeLayer
     * @propertyOf stockTrackAngularJsApp.service:SvgArtistLayers
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLayers.prototype.removeLayer = function() {
      angular.forEach(this.selectedLayer.svgItems, function(item) {
        item.remove();
      });
      angular.forEach(this.selectedLayer.specialItems, function(item) {
        item.remove();
      });
      this.Layers.splice(this.Layers.indexOf(this.selectedLayer), 1);

      this.selectedLayer = this.Layers[0];
    };


    return Layers;

  });
