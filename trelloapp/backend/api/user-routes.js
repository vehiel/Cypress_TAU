"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonServer = require('json-server');
var app = jsonServer.create();
app.delete('/', function (_a, res) {
    var db = _a.app.parent.db;
    db.set('users', []).write();
    return res.status(204).end();
});
exports.default = app;
//# sourceMappingURL=user-routes.js.map