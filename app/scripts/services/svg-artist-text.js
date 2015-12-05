'use strict';

/**
 * @ngdoc service
 * @name svgArtistApp.service:SvgArtistText
 * @description
 * # SvgArtistText
 * Factory that contains all the properties and methods for a SvgArtistText
 *
 */
angular.module('svgArtistApp')
  .factory('SvgArtistText', function () {

    var SvgArtistText = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Object
        _this[property] = properties[property];
      });
    };




    /**
     * @ngdoc property
     * @name SvgArtistText.addText
     * @propertyOf stockTrackAngularJsApp.service:SvgArtistText
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistText.prototype.addText = function() {

      var _this = this;

      _this.createTextActive = true;

      var svg = this.svgContainer;

      this.addLayerIfNone();

      var tempText = "";

      var deleteKeyDown = window.addEventListener('keydown', function (e) {
        if (e.keyIdentifier === 'U+0008' || e.keyIdentifier === 'Backspace' || e.keyCode === '8' || document.activeElement !== 'text') {
          if (e.target === document.body) {
            e.preventDefault();
          }
        }
      }, true);

      svg
        .on("mousedown", function () {

          var m = d3.mouse(svg.node());

          var textBoundingBox = _this.selectedLayer.layer.append('rect')
            .attr("x", m[0])
            .attr("y", m[1] - 20 + 3)
            .attr("width", 3)
            .attr("height", 20)
            .attr("name", "bounding-box")
            .attr("class", "bounding-box")
            .style("fill", "#ccc")
            .style("fill-opacity", ".3")
            .style("stroke", "#666")
            .style("stroke-width", "1.5px");

          _this.selectedLayer.specialItems.unshift(textBoundingBox);

          var textItem = _this.selectedLayer.layer.append('text')
            .attr("x", m[0])
            .attr("y", m[1])
            .attr("name", "text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px");

          _this.selectedLayer.svgItems.unshift(textItem);

          d3.select('body').on("keyup", function() {
            console.log(d3.event.keyCode, String.fromCharCode(d3.event.keyCode));

            // Esc and Enter stop the text entry
            if(d3.event.keyCode === 13 || d3.event.keyCode === 27) {
              d3.select('body').on("keyup", null);
              _this.createTextActive = false;
              textBoundingBox.remove();
              $rootScope.$apply();
              return false;
            }

            if(d3.event.keyCode === 8) {
              tempText = tempText.substring(0, tempText.length - 1);
            }else{
              tempText = tempText + '' + String.fromCharCode(d3.event.keyCode);
            }

            textItem.text(tempText);

            // Get the bounding box
            var bbox = textItem.node().getBBox();

            textBoundingBox
              .attr("x", bbox.x)
              .attr("y", bbox.y)
              .attr("width", bbox.width)
              .attr("height", bbox.height)

          });
        })
        .on("mouseup", function () {
          svg.on('mousedown', null);
          svg.on('mouseup', null);
        });


    };



    return SvgArtistText;

  });
