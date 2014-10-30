describe('dbrans.validate', function() {
  var $compile;
  var $rootScope;
  
  beforeEach(module('dbrans.validate'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('works', function() {
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
    expect(ngModelCtrl.$error.odd).toBe(undefined);
    expect(ngModelCtrl.$error.min).toBe(undefined);

    ngModelCtrl.$setViewValue(2);
    expect(ngModelCtrl.$error.odd).toBe(true);
    expect(ngModelCtrl.$error.min).toBe(undefined);

  });
});
