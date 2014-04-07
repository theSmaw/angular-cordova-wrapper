/*
 https://github.com/daniellmb/angular-test-patterns/blob/master/patterns/service.md
 */

'use strict';

describe('Service: cordovaContacts', function () {
    var cordovaContacts;
    var $rootScope;
    var $timeout;

    // Use to provide any mocks needed
    function _provide(callback) {
        // Execute callback with $provide
        module(function ($provide) {
            callback($provide);
        });
    }

    // Use to inject the code under test
    function _inject() {
        inject(function (_cordovaContacts_, _$rootScope_, _$timeout_) {
            cordovaContacts = _cordovaContacts_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
        });
    }

    // Call this before each test, except where you are testing for errors
    function _setup() {
        // Mock any expected data
        _provide(function (provide) {
            provide.value('$window', angular.injector(['mockCordova']).get('mock$window'));
        });

        // Inject the code under test
        _inject();
    }

    beforeEach(function () {
        // Load the service's module
        module('angularCordovaWrapper');
    });

    describe('the service api', function () {
        beforeEach(function () {
            // Inject with expected values
            _setup();
        });

        it('should exist', function () {
            expect(cordovaContacts).to.exist;
        });

        describe('create method', function () {

            it('should exist', function () {
                expect(cordovaContacts.createContact).to.exist;
            });

            it('should return a new Contact object', function () {
                var contact;
                cordovaContacts.createContact({displayName: 'Foo Bar'}).then(function (returned) {
                    contact = returned;
                });
                $rootScope.$apply();
                expect(contact).to.be.an('object');
                expect(contact.displayName).to.equal('Foo Bar');

            });
        });

        describe('find method', function () {

            it('should exist', function () {
                expect(cordovaContacts.findContacts).to.exist;
            });

            it('can return multiple contact objects', function () {
                var contact;
                cordovaContacts.findContacts(['id', 'name'])
                    .then(function (result) {
                        contact = result;
                    });
                $rootScope.$apply();
                expect(contact).to.have.length(2);
            });

            it('can handle errors and return a rejected promise', function () {
                var error;
                cordovaContacts.findContacts()
                    .then(function (err) {
                        error = err;
                    });
                $rootScope.$apply();
                expect(error).to.equal('error');
            });

            it('can accept a filter and return a single contact object', function () {
                var contact;
                cordovaContacts.findContacts(['id', 'name'], {filter: '', multiple: false})
                    .then(function (result) {
                        contact = result;
                    });
                $rootScope.$apply();
                expect(contact).to.deep.equal({id:1, name:'john'});
            });

            it('can accept a filter and return multiple objects', function () {
                var contact;
                cordovaContacts.findContacts(['id', 'name'])
                    .then(function (result) {
                        contact = result;
                    });
                $rootScope.$apply();
                expect(contact).to.have.length(2);
            });
        });
    });

    describe('service errors', function () {

        it.skip('should throw an error when required dependency is missing', function () {
            // Use an anonymous function to wrap the code that will fail
            function wrapper() {
                // Inject WITHOUT providing required values
                _inject();
            }

            expect(wrapper).to.throw('cordovaContacts:  not provided');
            /*
             Note: you can use Function.bind to avoid an anonymous function wrapper for inject,
             however, you'll need a polyfill for PhantomJS such as: http://goo.gl/XSLOdx
             var svc = function (cordovaContacts) {};
             expect(inject.bind(null, svc)).toThrow('cordovaContacts:  not provided');
             */
        });
    });
});