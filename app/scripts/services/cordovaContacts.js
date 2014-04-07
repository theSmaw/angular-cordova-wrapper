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
