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

        svc.save = function (contactObject) {
            var def = $q.defer();

            function onSuccess() {
                $log.debug('contact saved successfully');
                def.resolve('contact saved successfully');
            }

            function onFail(error) {
                $log.debug('error: ' + error);
                def.resolve(error || 'error');
            }

            contactObject.save(onSuccess, onFail);

            return def.promise;
        };

        return svc;
    });
