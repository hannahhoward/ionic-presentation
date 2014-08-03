'use strict';

describe('controllers', function(){
  var scope, $famous;

  beforeEach(module('famous.angular'));
  beforeEach(module('famousAngularStarter'));

  beforeEach(inject(function($rootScope, _$famous_) {
  	scope = $rootScope.$new();
    $famous = _$famous_;
  }));

  it('should define 3 awesome things', inject(function($controller) {
    expect(scope.awesomeThings).toBeUndefined()

    $controller('MainCtrl', {
      $scope: scope,
      $famous: $famous
  	})

    expect(angular.isArray(scope.awesomeThings)).toBeTruthy();
    expect(scope.awesomeThings.length).toBe(3);
  }));
});
