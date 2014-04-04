'use strict';

angular.module('angularCordovaWrapper')
    .factory('cordovaReady', function($q, $timeout, $document) {
        var svc = {};

        svc.ready = function() {
            var deferred = $q.defer();

            $document.bind('deviceready', function() {
                $timeout(function () {
                    deferred.resolve('cordova ready');
                });
            });

            return deferred.promise;
        };

        return svc;
    });
