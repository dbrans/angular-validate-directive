# angular-validate-directive

An angular component for light-weight validation.

## Usage
1. Include `validate.js` on your page after `angular.js`
2. Add `dbrans.validate` as a dependency of your app.

```html
<form name="myForm">
  <input ng-model="foo" dbrans-validate="{odd: isOdd}">
  <div ng-messages="myForm.foo.$error">
    <div ng-message="odd">You need to pick an odd number.</div>
  </div>
</form>
```

```javascript
angular.module('yourModule')
  .controller('OddController', function($scope) {
    $scope.isOdd = function(x) { return x % 2 === 1; };
});
```