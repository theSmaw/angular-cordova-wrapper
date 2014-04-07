'use strict';

angular
    .module('angularCordovaWrapper', []);


'use strict';

angular.module('angularCordovaWrapper')
    .factory('cordovaContacts', function ($q, $log, $window) {
        var svc = {};

        svc.createContact = function (options) {
            var def = $q.defer();
            $log.debug('cordovaContacts: create');
            var contact = $window.navigator.contacts.create(options);
            def.resolve(contact);
            $log.debug('cordovaContacts: contact created');
            return def.promise;
        };

        svc.findContacts = function (contactFields, contactFindOptions) {
            var def = $q.defer();
            $log.debug('cordovaContacts: find');
            $window.navigator.contacts.find(
                contactFields,
                function (results) {
                    $log.debug('cordovaContacts: find: success');
                    def.resolve(results);
                },
                function (error) {
                    $log.debug('cordovaContacts: find: error');
                    def.resolve(error);
                },
                contactFindOptions
            );

            $log.debug('cordovaContacts: find: return promise');
            return def.promise;

        };

        return svc;
    });

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

'use strict';

angular.module('angularCordovaWrapper')
    .factory('cordovaReady', function($q, $log, $timeout, $document) {
        var svc = {};

        svc.ready = function() {
            var deferred = $q.defer();

            var ben = "TWENTY";

            $log.debug('waiting for device ready');
            $document.bind('deviceready', function() {

                $log.debug('device is ready');
                $timeout(function () {
                    $log.debug('resolve me');
                    deferred.resolve('cordova ready');
                });
            });

            return deferred.promise;
        };

        return svc;
    });
