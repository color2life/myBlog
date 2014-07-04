'use strict';

describe('Controller: BlogStartupsCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var BlogStartupsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlogStartupsCtrl = $controller('BlogStartupsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
