'use strict';

describe('Service: SvgArtistText', function () {

  // load the service's module
  beforeEach(module('svgArtistApp'));

  // instantiate service
  var SvgArtistText;
  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_SvgArtistText_) {
    SvgArtistText = _SvgArtistText_;
  }));

  describe('SvgArtistText.http', function () {

    it('SvgArtistText should exist', function () {
      expect(SvgArtistText.http).not.toBeUndefined();
    });

  });

});
