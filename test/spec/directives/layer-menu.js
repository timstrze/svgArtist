'use strict';

describe('Directive: layer-menu', function() {
  var $compile, $rootScope, testData;

  // Load the myApp module, which contains the directive
  beforeEach(module('svgArtistApp'));

  // Store references to $rootScope and $compile
  beforeEach(inject(function($templateCache, _$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    testData = angular.copy(window.testData);

  }));

  it('should contain the class name of layer-menu', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<layer-menu></layer-menu>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the template content
    expect(element.isolateScope().clickButton).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="layer-menu"');
  });
});
