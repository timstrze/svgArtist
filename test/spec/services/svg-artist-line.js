'use strict';

describe('Service: SvgArtistLine', function () {

  // load the service's module
  beforeEach(module('svgArtistApp'));

  // instantiate service
  var SvgArtistLine;
  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_SvgArtistLine_) {
    SvgArtistLine = _SvgArtistLine_;
  }));

  describe('SvgArtistLine.http', function () {

    it('SvgArtistLine should exist', function () {
      expect(SvgArtistLine.http).not.toBeUndefined();
    });

  });

});
