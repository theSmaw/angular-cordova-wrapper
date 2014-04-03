'use strict';

describe('Service: deviceReady', function () {

  // load the service's module
  beforeEach(module('angularCordovaWrapper'));

  // instantiate service
  var deviceReady;
  beforeEach(inject(function (_deviceReady_) {
      deviceReady = _deviceReady_;
  }));

  it('should do something', function () {
    expect(!!deviceReady).to.equal(true);
  });

});
