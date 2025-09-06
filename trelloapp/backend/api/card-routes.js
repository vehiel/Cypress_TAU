"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_1 = require("../utils/validate");
var moment = require('moment');
var jsonServer = require('json-server');
var app = jsonServer.create();
app.post('/', function (_a, res, next) {
    var body = _a.body;
    (0, validate_1.validate)(['boardId', 'listId', 'name'], body, res);
    if (res.statusCode !== 400) {
        // data generation
        body.created = moment().format('YYYY-MM-DD');
        body.deadline = moment()
            .add(3, 'days')
            .format('YYYY-MM-DD'),
            body.description = '';
        body.completed = false;
        // stream message
        //  socket.emit('cardCreated', body.listId, body);
        next();
    }
});
app.delete('/', function (_a, res) {
    var db = _a.app.parent.db;
    db.set('cards', []).write();
    return res.status(204).end();
});
exports.default = app;
//# sourceMappingURL=card-routes.js.map