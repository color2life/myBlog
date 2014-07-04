'use strict';

describe('Controller: BlogMatchdepCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var BlogMatchdepCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlogMatchdepCtrl = $controller('BlogMatchdepCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
