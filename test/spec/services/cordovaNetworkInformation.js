/*
 https://github.com/daniellmb/angular-test-patterns/blob/master/patterns/service.md
 */

'use strict';

describe('Service: cordovaNetworkInformation', function () {
    var network;
    var $rootScope;
    var mockDocument;
    var mockCordovaReady;
    var mockWindow;

    function createMockDocument() {
        mockDocument = {
            bind: function(str, cb) {
                this.bindCallbacks[str] = cb;
            },
            bindCallbacks: {}
        };

        return mockDocument;
    }

    function createMockCordovaReady() {
        mockCordovaReady = {
            ready: function () {
                return {
                    then: function(cb) {
                        cb();
                    }
                };
            }
        };
        return mockCordovaReady;
    }

    function createMockWindow() {
        mockWindow = angular.injector(['mockCordova']).get('mock$window');
        return mockWindow;
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
        inject(function (_cordovaNetworkInformation_,
                         _$rootScope_)
        {
            network = _cordovaNetworkInformation_;
            $rootScope = _$rootScope_;
        });
    }

    // Call this before each test, except where you are testing for errors
    function _setup() {
        // Mock any expected data
        _provide(function (provide) {
            provide.value('$window', createMockWindow());
            provide.value('cordovaReady', createMockCordovaReady());
            provide.value('$document', createMockDocument());
        });

        // Inject the code under test
        _inject();
    }

    beforeEach(function () {
        // Load the service's module
        module('angularCordovaWrapper');
    });

    describe('the service', function () {
        beforeEach(function () {
            // Inject with expected values
            _setup();
            sinon.spy($rootScope, '$broadcast');
        });

        it('should exist', function () {
            expect(network).to.exist;
        });

        it('should attach an event listener for when a device goes online', function () {
            mockDocument.bindCallbacks.online();
            expect($rootScope.$broadcast).to.have.been.calledOnce;
            expect($rootScope.$broadcast).to.have.been.calledWith('Cordova.NetworkStatus.Online');
        });

        it('should attach an event listener for when a device goes offline', function () {
            mockDocument.bindCallbacks.offline();
            expect($rootScope.$broadcast).to.have.been.calledOnce;
            expect($rootScope.$broadcast).to.have.been.calledWith('Cordova.NetworkStatus.Offline');
        });

        describe('api:', function () {
            describe('checkConnection method', function () {
                it('should exist', function () {
                    expect(network.checkConnection).to.exist;
                });

                it('should return the current connection', function () {
                    expect(network.checkConnection()).to.equal(mockWindow.Connection.NONE);
                });


            });

            describe('isOnline method', function () {
                it('should exist', function () {
                    expect(network.isOnline).to.exist;
                });

                it('should return true if the device is online', function () {
                    mockWindow.navigator.connection.type = mockWindow.Connection.CELL;
                    expect(network.isOnline()).to.be.true;
                });

                it('should return false if the device is offline', function () {
                    mockWindow.navigator.connection.type = mockWindow.Connection.CELL;
                    expect(network.isOnline()).to.be.true;
                    mockWindow.navigator.connection.type = mockWindow.Connection.NONE;
                    expect(network.isOnline()).to.be.false;
                    mockWindow.navigator.connection.type = mockWindow.Connection.UNKNOWN;
                    expect(network.isOnline()).to.be.false;
                });
            });
        });
    });
});