'use strict';

angular.module('mockCordova', [])

    .factory('mock$window', function () {
        var mockWindow = {
            navigator: {
                contacts:{}
            }
        };

        var mockData = [
            {
                id: 1,
                name: 'john'
            },
            {
                displayName: 'john smith'
            }
        ];

        mockWindow.navigator.contacts.create = function(options) {
            return options;
        };

        mockWindow.navigator.contacts.find = function (contactFields, success, fail, contactFindOptions) {
            if(contactFields === undefined) {
                fail('error');
            } else if (contactFindOptions) {
                if (!contactFindOptions.multiple) {
                    success(mockData[0]);
                } else {
                    success(mockData);
                }
            } else {
                success(mockData);
            }
        };

        return mockWindow;
    });
