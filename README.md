# angular-validate-directive

An angular directive for doing one-off custom validation.

Under the hood this directive uses the validator API introduced in 
angular 1.3. See NgModelController's $validators and $asyncValidators properties:

https://docs.angularjs.org/api/ng/type/ngModel.NgModelController

## Usage
1. Include `validate.js` on your page after `angular.js`
2. Add `dbrans.validate` as a dependency of your app.

### Synchronous validation

```html
<form name="myForm">
  <input name="foo" ng-model="foo" dbrans-validate="{odd: isOdd}">
  <div ng-messages="myForm.foo.$error">
    <div ng-message="odd">You need to pick an odd number.</div>
  </div>
</form>
```

```javascript
angular.module('yourModule')
  .controller('MyController', function($scope) {
    $scope.isOdd = function(x) { return x % 2 === 1; };
});
```

### Async validation

```html
<form name="myForm">
  Choose a unique username: 
  <input name="username" ng-model="username" 
         dbrans-validate-async="{unique: isUsernameUnique}">
  <div ng-messages="myForm.username.$error">
    <div ng-message="unique">Sorry, that username is taken.</div>
  </div>
</form>
```

```javascript
angular.module('yourModule')
  .controller('MyController', function($scope, $http, $q) {
    $scope.isUsernameUnique = function(username) { 
      $http.get('/api/user/' + username).then(function() {
        return $q.reject(); // 200 - user exists
      }, function() {
        return true; // 404 - user does not exist
      });
    };
});
```
