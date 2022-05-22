"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const datasources_1 = require("../../../datasources");
const services_1 = require("../../../services");
const helpers_1 = require("../../helpers");
describe('GeoLookupService', function () {
    this.timeout(30 * 1000);
    let cachingProxy;
    before(async () => (cachingProxy = await (0, helpers_1.givenCachingProxy)()));
    after(() => cachingProxy.stop());
    let service;
    before(givenGeoService);
    let available = true;
    before(async () => {
        available = await (0, helpers_1.isGeoCoderServiceAvailable)(service);
    });
    it('resolves an address to a geo point', async function () {
        if (!available)
            return this.skip();
        const points = await service.geocode(helpers_1.aLocation.address);
        (0, testlab_1.expect)(points).to.deepEqual([helpers_1.aLocation.geopoint]);
    });
    async function givenGeoService() {
        const config = (0, helpers_1.getProxiedGeoCoderConfig)(cachingProxy);
        const dataSource = new datasources_1.GeocoderDataSource(config);
        service = await new services_1.GeocoderProvider(dataSource).value();
    }
});
//# sourceMappingURL=geocoder.service.integration.js.map