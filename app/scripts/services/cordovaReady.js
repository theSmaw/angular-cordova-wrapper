'use strict';

angular.module('angularCordovaWrapper')
    .factory('cordovaReady', function($q, $timeout, $window) {
        var svc = {};

        svc.ready = function() {
            var deferred = $q.defer();

            $window.document.addEventListener('deviceready', function() {

                $timeout(function () {
                    deferred.resolve('cordova ready');
                });
            }, false);

            return deferred.promise;
        };

        return svc;
    });
