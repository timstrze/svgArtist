'use strict';

describe('Service: SvgArtistSave', function () {

  // load the service's module
  beforeEach(module('svgArtistApp'));

  // instantiate service
  var SvgArtistSave;
  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_SvgArtistSave_) {
    SvgArtistSave = _SvgArtistSave_;
  }));

  describe('SvgArtistSave.http', function () {

    it('SvgArtistSave should exist', function () {
      expect(SvgArtistSave.http).not.toBeUndefined();
    });

  });

});
