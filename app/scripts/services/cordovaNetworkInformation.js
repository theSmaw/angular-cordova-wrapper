'use strict';

angular.module('angularCordovaWrapper')
    .factory('cordovaNetworkInformation', function (cordovaReady, $rootScope, $document, $window) {

        cordovaReady.ready()
            .then(function () {
                $document.bind('online', function () {
                    $rootScope.$broadcast('Cordova.NetworkStatus.Online');
                });
                $document.bind('offline', function () {
                    $rootScope.$broadcast('Cordova.NetworkStatus.Offline');
                });
            });


        var svc = {};

        svc.checkConnection = function() {
            return $window.navigator.connection.type;
        };

        svc.isOnline = function () {
            var online;

            if((this.checkConnection() === $window.Connection.UKNOWN) || (this.checkConnection() === $window.Connection.UKNOWN)) {
                online = false;
            } else {
                online = true;
            }

            return online;
        };

        return svc;
    });
