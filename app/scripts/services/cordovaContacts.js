'use strict';

angular.module('angularCordovaWrapper')
    .factory('cordovaContacts', function ($q, $log, $window) {
        var svc = {};

        svc.createContact = function (options) {
            var def = $q.defer();
            $log.debug('cordovaContacts: create');
            var contact = $window.navigator.contacts.create(options);
            def.resolve(contact);
            return def.promise;
        };

        svc.findContacts = function (contactFields, contactSuccess, contactError, contactFindOptions) {

        };

        return svc;
    });
