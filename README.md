![Master Branch build status](https://circleci.com/gh/connectid/angular-cordova-wrapper.png?circle-token=3cf79bb5063b5d4fda40eb4117e261bd6d9375c0)
![Dependencies status](https://david-dm.org/connectid/angular-cordova-wrapper.png)

## Overview

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
bower install angular-cordova-wrapper --save
```

## API Reference

The library currently supports the following plugins:

### Contacts

> API reference coming soon

### Network Connectivity

> API reference coming soon

## Contributing

We welcome contributions to the project. Editorconfig and jshintrc should take care of most of the coding conventions,
for all others please use the existing code as a style guide.

After cloning the repo, run:
```
npm install -g yo
npm install
bower install
```
We operate in a TDD manner to keep our design and implementation as small and simple as possible. We ask that you keep simplicity to the fore when contributing.
Please log any issues here in the Github repo issue tracker.

## Tests

We use Mocha, along with Chai, Sinon and associated plugins, these are all in the package.json so nothing extra to do here.
Tests are run with Karma via Grunt.

* Local development:
```
grunt test
```
* Single run (for example to use in CI):
```
grunt ci
```

## License

&copy; Connectid Ltd.
Shared under the MIT License