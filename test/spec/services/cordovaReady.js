'use strict';

describe('Service: cordovaReady', function () {

    var SUT;
    var mockDocument;
    var $timeout;
    function createMockDocument() {
        mockDocument = {
            bind: sinon.spy()
        };

        return mockDocument;
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
        inject(function (_cordovaReady_, _$timeout_) {
            SUT = _cordovaReady_;
            $timeout = _$timeout_;
        });
    }

    // Call this before each test, except where you are testing for errors
    function _setup() {
        // Mock any expected data
        _provide(function (provide) {
            provide.value('$document', createMockDocument());

        });

        // Inject the code under test
        _inject();
    }

    beforeEach(function () {
        // Load the service's module
        module('angularCordovaWrapper');
    });

    beforeEach(function () {
        _setup();
    });

    it('should have a ready function', function() {
        expect(SUT.ready).to.exist;
    });

    it('should resolve with a message', function() {
        var valueToVerify;
        SUT.ready().then(function(returned) {
            valueToVerify = returned;
        });
        mockDocument.bind.args[0][1]();
        $timeout.flush();

        expect(valueToVerify).to.equal('cordova ready');
    });

});
