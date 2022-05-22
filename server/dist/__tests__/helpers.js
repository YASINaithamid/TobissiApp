"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGeoCoderServiceAvailable = exports.givenCachingProxy = exports.HttpCachingProxy = exports.getProxiedGeoCoderConfig = exports.aLocation = exports.givenTodo = void 0;
const tslib_1 = require("tslib");
const http_caching_proxy_1 = require("@loopback/http-caching-proxy");
Object.defineProperty(exports, "HttpCachingProxy", { enumerable: true, get: function () { return http_caching_proxy_1.HttpCachingProxy; } });
const lodash_1 = require("lodash");
const path_1 = tslib_1.__importDefault(require("path"));
const datasources_1 = require("../datasources");
const models_1 = require("../models");
/*
 ==============================================================================
 HELPER FUNCTIONS
 If you find yourself creating the same helper functions across different
 test files, then extracting those functions into helper modules is an easy
 way to reduce duplication.

 Other tips:

 - Using the super awesome Partial<T> type in conjunction with Object.assign
   means you can:
   * customize the object you get back based only on what's important
   to you during a particular test
   * avoid writing test logic that is brittle with respect to the properties
   of your object
 - Making the input itself optional means you don't need to do anything special
   for tests where the particular details of the input don't matter.
 ==============================================================================
 *

/**
 * Generate a complete Todo object for use with tests.
 * @param todo - A partial (or complete) Todo object.
 */
function givenTodo(todo) {
    const data = Object.assign({
        title: 'do a thing',
        desc: 'There are some things that need doing',
        isComplete: false,
    }, todo);
    return new models_1.Todo(data);
}
exports.givenTodo = givenTodo;
exports.aLocation = {
    address: '1 New Orchard Road, Armonk, 10504',
    geopoint: { y: 41.109657, x: -73.72466 },
    get geostring() {
        return `${this.geopoint.y},${this.geopoint.x}`;
    },
};
function getProxiedGeoCoderConfig(proxy) {
    return (0, lodash_1.merge)({}, datasources_1.GeocoderDataSource.defaultConfig, {
        options: {
            proxy: proxy.url,
            tunnel: false,
        },
    });
}
exports.getProxiedGeoCoderConfig = getProxiedGeoCoderConfig;
async function givenCachingProxy() {
    const proxy = new http_caching_proxy_1.HttpCachingProxy({
        cachePath: path_1.default.resolve(__dirname, '.http-cache'),
        logError: false,
        timeout: 5000,
    });
    await proxy.start();
    return proxy;
}
exports.givenCachingProxy = givenCachingProxy;
async function isGeoCoderServiceAvailable(service) {
    try {
        await service.geocode(exports.aLocation.address);
        return true;
    }
    catch (err) {
        if (err.statusCode === 502) {
            return false;
        }
        throw err;
    }
}
exports.isGeoCoderServiceAvailable = isGeoCoderServiceAvailable;
//# sourceMappingURL=helpers.js.map