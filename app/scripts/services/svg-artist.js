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
  .factory('SvgArtist', function ($rootScope) {

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



    var mousedown = function (line, svg) {
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

    var mousemove = function (svg, line) {
      var m = d3.mouse(svg.node());
      line.attr("x2", m[0])
        .attr("y2", m[1]);
    };

    var binaryblob = function (){
      var byteString = atob(document.querySelector("canvas").toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")); //wtf is atob?? https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var dataView = new DataView(ab);
      var blob = new Blob([dataView], {type: "image/png"});
      var DOMURL = self.URL || self.webkitURL || self;
      var newurl = DOMURL.createObjectURL(blob);

      var img = '<img src="'+newurl+'">';
      d3.select("#img").html(img);
    }



    /**
     * @ngdoc function
     * @name activateCreateLine
     * @methodOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.createNewLayer = function() {

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
     * @name addLayerIfNone
     * @methodOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Create layer if none exists.
     */
    SvgArtist.prototype.addLayerIfNone = function () {
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
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.selectLayer = function(layer) {
      this.selectedLayer = layer;
    };


    /**
     * @ngdoc property
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.selectItemsInLayer = function(selectedLayer) {

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
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.deSelectItemsInLayer = function(layer) {

      this.selectedLayer = layer;

      //angular.forEach(layer.specialItems, function(specialItem) {
      //
      //  layer.specialItems.unshift(rect);
      //
      //});

    };


    /**
     * @ngdoc property
     * @name clearAll
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.removeAllLayers = function() {
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
     * @name removeLayer
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.removeLayer = function() {
      angular.forEach(this.selectedLayer.svgItems, function(item) {
        item.remove();
      });
      angular.forEach(this.selectedLayer.specialItems, function(item) {
        item.remove();
      });
      this.Layers.splice(this.Layers.indexOf(this.selectedLayer), 1);

      this.selectedLayer = this.Layers[0];
    };


    /**
     * @ngdoc function
     * @name activateCreateLine
     * @methodOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.activateCreateLine = function() {

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
     * @name saveImageToDesktop
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.saveImageToDesktop = function() {
      var html = d3.select(".base-chart svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

      //console.log(html);
      var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
      var img = '<img src="'+imgsrc+'">';
      d3.select("#svgdataurl").html(img);

      var canvas = document.querySelector(".export-canvas");

      var someImage = d3.select(".base-chart svg").node().getBoundingClientRect();

      canvas.height = someImage.height;
      canvas.width = someImage.width;

      var context = canvas.getContext("2d");

      var image = new Image;
      image.src = imgsrc;
      image.onload = function() {
        context.drawImage(image, 0, 0);

        //save and serve it as an actual filename
        binaryblob();

        var a = document.createElement("a");
        a.download = "sample.png";
        a.href = canvas.toDataURL("image/png");

        var pngimg = '<img src="'+a.href+'">';
        d3.select("#pngdataurl").html(pngimg);

        a.click();
      };
    };


    SvgArtist.prototype.returnSvgItemName = function(svgItem) {
      return svgItem[0][0].nodeName;
    };

    /**
     * @ngdoc property
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.selectSvgItem = function(selectedItem, selectedLayer) {

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



    /**
     * @ngdoc property
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.addText = function() {

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


    /**
     * @ngdoc property
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.undoAction = function() {

      if(this.Layers.length > 0) {

        this.Layers[0].item.remove();

        this.Layers.shift();
      }
    };



    /**
     * @ngdoc property
     * @name clearAll
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
