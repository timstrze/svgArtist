'use strict';

/**
 * @ngdoc service
 * @name svgArtistApp.service:SvgArtistLine
 * @description
 * # SvgArtistLine
 * Factory that contains all the properties and methods for a SvgArtistLine
 *
 */
angular.module('svgArtistApp')
  .factory('SvgArtistLine', function () {

    var SvgArtistLine = function (properties) {
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
     * @name SvgArtistLine.mousedown
     * @methodOf stockTrackAngularJsApp.service:SvgArtistLine
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLine.prototype.mousedown = function (line, svg) {
      var m = d3.mouse(svg.node());
      line
        .attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1])
        .attr({
          'class': 'drawn-line',
          'fill': 'none',
          'shape-rendering': 'crispEdges',
          'stroke-width': '2px',
          'stroke': 'steelblue',
          'stroke-linecap': 'round'
        });

      svg.on("mousemove", function () {
        mousemove(svg, line);
      });
    };

    /**
     * @ngdoc function
     * @name SvgArtistLine.mousemove
     * @methodOf stockTrackAngularJsApp.service:SvgArtistLine
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLine.prototype.mousemove = function (svg, line) {
      var m = d3.mouse(svg.node());
      line.attr("x2", m[0])
        .attr("y2", m[1]);
    };




    /**
     * @ngdoc function
     * @name SvgArtistLine.activateCreateLine
     * @methodOf stockTrackAngularJsApp.service:SvgArtistLine
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLine.prototype.activateCreateLine = function() {

      var _this = this;

      this.createLineActive = true;

      this.addLayerIfNone();

      var svg = this.svgContainer;

      var line = this.selectedLayer.layer.append("line").attr("name", "line");

      this.selectedLayer.svgItems.unshift(line);

      svg
        .on("mousedown", function () {
          mousedown(line, svg);
        })
        .on("mouseup", function () {

          _this.createLineActive = false;
          svg.on("mousemove", null);
          svg.on("mousedown", null);
          svg.on("mouseup", null);
          $rootScope.$apply();
        });
    };


    /**
     * @ngdoc property
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistLine.prototype.selectSvgItem = function(selectedItem, selectedLayer) {

      var bbox = selectedItem.node().getBBox();

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

    };




    return SvgArtistLine;

  });
