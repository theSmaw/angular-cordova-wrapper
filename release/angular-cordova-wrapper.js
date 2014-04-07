"use strict";angular.module("angularCordovaWrapper",[]),angular.module("angularCordovaWrapper").factory("cordovaContacts",["$q","$log","$window",function(a,b,c){var d={};return d.createContact=function(d){var e=a.defer();b.debug("cordovaContacts: create");var f=c.navigator.contacts.create(d);return e.resolve(f),b.debug("cordovaContacts: contact created"),e.promise},d.findContacts=function(d,e){var f=a.defer();return b.debug("cordovaContacts: find"),c.navigator.contacts.find(d,function(a){b.debug("cordovaContacts: find: success"),f.resolve(a)},function(a){b.debug("cordovaContacts: find: error"),f.resolve(a)},e),b.debug("cordovaContacts: find: return promise"),f.promise},d}]),angular.module("angularCordovaWrapper").factory("cordovaNetworkInformation",["cordovaReady","$rootScope","$document","$window",function(a,b,c,d){a.ready().then(function(){c.bind("online",function(){b.$broadcast("Cordova.NetworkStatus.Online")}),c.bind("offline",function(){b.$broadcast("Cordova.NetworkStatus.Offline")})});var e={};return e.checkConnection=function(){return d.navigator.connection.type},e.isOnline=function(){var a;return a=this.checkConnection()===d.Connection.UKNOWN||this.checkConnection()===d.Connection.UKNOWN?!1:!0},e}]),angular.module("angularCordovaWrapper").factory("cordovaReady",["$q","$timeout","$document",function(a,b,c){var d={};return d.ready=function(){var d=a.defer();return c.bind("deviceready",function(){b(function(){d.resolve("cordova ready")})}),d.promise},d}]);