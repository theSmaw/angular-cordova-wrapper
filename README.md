## Synopsis

Angular-Cordova-Wrapper is an AngularJS library that wraps the API for each of the Cordova plugins. It has been designed with promises in mind.

## Quick Start

Add the source file to your html:
```html
<script src="bower_components/angular-cordova-wrapper/release/angular-cordova-wrapper.js"></script>
```

Add the library as a dependency for your module:
```javascript
angular.module('myAwesomeApp', [angularCordovaWrapper]);
```

Then you can start using the plugins as you need them:
```javascript
angular.module('myAwesomeApp').controller('AwesomeCtrl', function ($scope, cordovaContacts) {
    $scope.spongeBob = cordovaContacts.createContact({
        displayName: 'Spongebob'
    });
});
```

## Motivation

This work came about after wanting to use Cordova 'the Angular way'.
There were a few other projects out there starting to wrap Cordova, but they either were making slow progress, or did not appear to have adequate testing.
We wanted to have a well-tested and complete set of APIs that wrapped the Cordova API as closely as possible and embraced promised for greater good!

## Installation

```
npm install -g yo
npm install
bower install
```

## API Reference

The library currently supports the following plugins:

# Contacts

# Network Connectivity

## Tests

Tests are run with Karma via Grunt.

* Local development:
```
grunt test
```
* Single run (for example to use in CI):
```
grunt ci
```

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

&copy; Connectid Ltd.
Shared under the MIT License