"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var jws = require('jws-jwk');
var _ = require('lodash');
var jsonServer = require('json-server');
var app = jsonServer.create();
app.post('/', function (req, res, next) {
    if (req.body.jwt) {
        var token = req.body.jwt.split('.')[0];
        var userInfo = req.body.jwt.split('.')[1];
        var kid_1 = JSON.parse(Buffer.from(token, 'base64').toString()).kid;
        var email_1 = JSON.parse(Buffer.from(userInfo, 'base64').toString()).email;
        if (kid_1 && email_1) {
            axios.get('https://www.googleapis.com/oauth2/v3/certs')
                .then(function (_a) {
                var keys = _a.data.keys;
                var jwk = _.find(keys, { kid: kid_1 });
                var validation = jws.verify(req.body.jwt, jwk);
                if (validation) {
                    req.body = { email: email_1, password: kid_1 };
                    next();
                }
                else {
                    var response = res.status(401).jsonp('Invalid authorization');
                    return response;
                }
            });
        }
        else {
            var response = res.status(401).jsonp('Invalid authorization');
            return response;
        }
    }
    else {
        next();
    }
});
exports.default = app;
//# sourceMappingURL=signup-routes.js.map