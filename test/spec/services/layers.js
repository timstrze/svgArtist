'use strict';

describe('Service: Layers', function () {

  // load the service's module
  beforeEach(module('svgArtistApp'));

  // instantiate service
  var Layers;
  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_Layers_) {
    Layers = _Layers_;
  }));

  describe('Layers.http', function () {

    it('Layers should exist', function () {
      expect(Layers.http).not.toBeUndefined();
    });

  });

});
