"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonServer = require('json-server');
var app = jsonServer.create();
app.post('/', function (_a, res) {
    var db = _a.app.parent.db;
    db.setState({
        boards: [],
        cards: [],
        lists: [],
        users: [],
    }).write();
    // socket.emit('boardsState', []);
    return res.status(204).end();
});
exports.default = app;
//# sourceMappingURL=reset-routes.js.map