/*
 https://github.com/daniellmb/angular-test-patterns/blob/master/patterns/service.md
 */

'use strict';

describe('Service: cordovaContacts', function () {
    var cordovaContacts;
    var $rootScope;
    var $timeout;
    var mockContact;

    function createMockContact() {
        mockContact = {
            save: sinon.spy(),
            remove: sinon.spy()
        };

        return mockContact;
    }

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

    describe('the service api:', function () {

        beforeEach(function () {
            // Inject with expected values
            _setup();
        });

        it('should exist', function () {
            expect(cordovaContacts).to.exist;
        });


        describe('createContact method', function () {

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


        describe('findContacts method', function () {

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


        describe('save method', function () {

            it('should exist', function () {
                expect(cordovaContacts.save).to.exist;
            });

            it('calls the correct Cordova "save" method', function () {
                var contact = cordovaContacts.createContact({displayName: 'Foo Bar'});
                contact.save = sinon.spy();
                cordovaContacts.save(contact);
                expect(contact.save).to.have.been.called;
            });

            it('confirms when saved successfully', function () {
                var promise;
                cordovaContacts.save(createMockContact()).then(function (result) {
                    promise = result;
                });
                mockContact.save.args[0][0]();
                $rootScope.$apply();
                expect(promise).to.equal('contact saved successfully');
            });

            it('returns an error if a contact cannot be saved', function () {
                var promise;
                cordovaContacts.save(createMockContact()).then(function (result) {
                    promise = result;
                });
                mockContact.save.args[0][1]();
                $rootScope.$apply();
                expect(promise).to.equal('error');
            });
        });


        describe('remove method', function () {

            it('should exist', function () {
                expect(cordovaContacts.remove).to.exist;
            });

            it('calls the correct Cordova "remove" method', function () {
                var contact = cordovaContacts.createContact({id: 1});
                contact.remove = sinon.spy();
                cordovaContacts.remove(contact);
                expect(contact.remove).to.have.been.called;
            });

            it('confirms it removed the contact successfully', function () {
                var promise;
                cordovaContacts.remove(createMockContact()).then(function (result) {
                    promise = result;
                });
                mockContact.remove.args[0][0]();
                $rootScope.$apply();
                expect(promise).to.equal('contact removed successfully');
            });
            
            it('returns an error if it cannot remove a contact', function () {
                var promise;
                cordovaContacts.remove(createMockContact()).then(function (result) {
                    promise = result;
                });
                mockContact.remove.args[0][1]();
                $rootScope.$apply();
                expect(promise).to.equal('error');
            });
        });
    });
});