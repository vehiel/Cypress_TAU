"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var jsonServer = require('json-server');
var app = jsonServer.create();
var euCountries = ['BE', 'EL', 'LT', 'PT', 'BG', 'ES', 'LU', 'RO', 'CZ', 'FR', 'HU', 'SI', 'DK', 'HR', 'MT', 'SK', 'DE', 'IT', 'NL', 'FI', 'EE', 'CY', 'AT', 'SE', 'IE', 'LV', 'PL'];
var discountCountries = [{
        countryCode: 'SK',
        discount: 20
    }];
app.get('/', function (req, res, next) {
    axios_1.default
        .get('https://geo.risk3sixty.com/me')
        .then(function (_a) {
        var data = _a.data;
        var locale = data.country;
        var countryDiscount = discountCountries.find(function (c) { return c.countryCode === locale; });
        var result = {
            location: locale.toLowerCase(),
            currency: euCountries.includes(locale) ? 'EUR' : locale === 'UK' ? 'GBP' : 'USD',
            discountEligible: countryDiscount ? true : false,
            discountAmount: countryDiscount === null || countryDiscount === void 0 ? void 0 : countryDiscount.discount
        };
        var response = res.status(200).jsonp(result);
        return response;
    });
});
exports.default = app;
//# sourceMappingURL=location-routes.js.map