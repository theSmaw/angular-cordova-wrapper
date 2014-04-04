'use strict';

angular.module('mockCordova', [])

    .factory('mock$window', function () {
        var mockWindow = {
            navigator: {
                contacts:{}
            }
        };

        mockWindow.navigator.contacts.create = function(options) {
            return options;
        };

        return mockWindow;
    });
