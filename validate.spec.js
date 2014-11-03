describe('dbrans.validate', function() {
  var $compile;
  var $rootScope;
  var $q;
  
  beforeEach(module('dbrans.validate'));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$q_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  it('supports synchronous validation', function() {
    scope = $rootScope.$new();
    scope.isOdd = function(value) {
      return value % 2 === 1;
    };
    var html = '<input type="number" min="1" ng-model="foo"' + 
               '       dbrans-validate="{odd: isOdd}">';
    var input = angular.element(html);
    $compile(input)(scope);

    var ngModelCtrl = input.controller('ngModel');
    ngModelCtrl.$setViewValue(0);
    expect(ngModelCtrl.$error.odd).toBe(true);
    expect(ngModelCtrl.$error.min).toBe(true);

    ngModelCtrl.$setViewValue(1);
    expect(ngModelCtrl.$error.odd).toBeFalsy();
    expect(ngModelCtrl.$error.min).toBeFalsy();

    ngModelCtrl.$setViewValue(2);
    expect(ngModelCtrl.$error.odd).toBe(true);
    expect(ngModelCtrl.$error.min).toBeFalsy();

  });

  it('supports asynchronous validation', function() {
    scope = $rootScope.$new();
    scope.isOddAsync = function(value) {
      return $q(function(resolve, reject) {
        value % 2 === 1 ? resolve() : reject();
      });
    };
    var html = '<input type="number" min="1" ng-model="foo"' + 
               '       dbrans-validate-async="{odd: isOddAsync}">';
    var input = angular.element(html);
    $compile(input)(scope);

    var ngModelCtrl = input.controller('ngModel');
    ngModelCtrl.$setViewValue(0);
    // Async validation doesn't happen if sync validation fails.
    expect(ngModelCtrl.$error.odd).toBeFalsy();
    expect(ngModelCtrl.$error.min).toBe(true);

    ngModelCtrl.$setViewValue(1);
    expect(ngModelCtrl.$error.odd).toBeFalsy();
    expect(ngModelCtrl.$error.min).toBeFalsy();

    ngModelCtrl.$setViewValue(2);
    expect(ngModelCtrl.$error.odd).toBe(true);
    expect(ngModelCtrl.$error.min).toBeFalsy();

  });

});
