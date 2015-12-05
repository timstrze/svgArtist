'use strict';

describe('Service: SvgArtistHistory', function () {

  // load the service's module
  beforeEach(module('svgArtistApp'));

  // instantiate service
  var SvgArtistHistory;
  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_SvgArtistHistory_) {
    SvgArtistHistory = _SvgArtistHistory_;
  }));

  describe('SvgArtistHistory.http', function () {

    it('SvgArtistHistory should exist', function () {
      expect(SvgArtistHistory.http).not.toBeUndefined();
    });

  });

});
