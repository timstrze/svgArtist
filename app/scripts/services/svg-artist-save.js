'use strict';

/**
 * @ngdoc service
 * @name svgArtistApp.service:SvgArtistSave
 * @description
 * # SvgArtistSave
 * Factory that contains all the properties and methods for a SvgArtistSave
 *
 */
angular.module('svgArtistApp')
  .factory('SvgArtistSave', function () {

    var SvgArtistSave = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Object
        _this[property] = properties[property];
      });
    };




    SvgArtistSave.prototype.binaryblob = function (){
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
    };


    /**
     * @ngdoc property
     * @name saveImageToDesktop
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtistSave.prototype.saveImageToDesktop = function() {
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



    return SvgArtistSave;

  });
