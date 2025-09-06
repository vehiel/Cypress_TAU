"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_1 = require("../utils/validate");
var moment = require('moment');
var jsonServer = require('json-server');
var app = jsonServer.create();
app.post('/', function (_a, res, next) {
    var body = _a.body;
    (0, validate_1.validate)(['boardId'], body, res);
    // data generation
    body.created = moment().format('YYYY-MM-DD');
    // stream message
    // socket.emit('listCreated', req.body.boardId, req.body);  
    next();
});
app.delete('/', function (_a, res) {
    var db = _a.app.parent.db;
    db.set('lists', []).write();
    db.set('cards', []).write();
    return res.status(204).end();
});
exports.default = app;
//# sourceMappingURL=list-routes.js.map