"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonServer = require('json-server');
var app = jsonServer.create();
var moment = require('moment');
var getUserId_1 = require("../utils/getUserId");
var validate_1 = require("../utils/validate");
app.get('/', function (_a, res) {
    var db = _a.app.parent.db, headers = _a.headers, query = _a.query;
    if ((query === null || query === void 0 ? void 0 : query.starred) === 'true') {
        query.starred = true;
    }
    if ((query === null || query === void 0 ? void 0 : query.starred) === 'false') {
        query.starred = false;
    }
    if (query === null || query === void 0 ? void 0 : query.id) {
        query.id = Number(query.id);
    }
    if (query === null || query === void 0 ? void 0 : query.name) {
        query.name = decodeURIComponent(query.name);
    }
    var publicBoards = db
        .get('boards')
        .filter(__assign({ user: 0 }, query))
        .value();
    var privateBoards = db
        .get('boards')
        .filter(__assign({ user: (0, getUserId_1.getUserId)(headers) }, query))
        .value();
    var result = __spreadArray(__spreadArray([], publicBoards, true), privateBoards, true);
    var response = res.status(200).jsonp(result);
    return response;
});
app.get('/:id', function (_a, res, next) {
    var db = _a.app.parent.db, params = _a.params, headers = _a.headers;
    var boardId = parseInt(params.id);
    var board = db
        .get('boards')
        .find({ id: boardId })
        .value();
    var userId = (0, getUserId_1.getUserId)(headers) || 0;
    if (board.user === userId || board.user === 0) {
        next();
    }
    else {
        res.status(403).jsonp({
            error: 'You don’t have access to this board'
        });
    }
});
app.post('/', function (_a, res, next) {
    var headers = _a.headers, body = _a.body;
    (0, validate_1.validate)(['name'], body, res);
    if (res.statusCode !== 400) {
        body.user = (0, getUserId_1.getUserId)(headers) || 0;
        body.starred = false;
        body.created = moment().format('YYYY-MM-DD');
        // socket.emit('boardCreated', req.body);
        next();
    }
});
app.delete('/', function (_a, res) {
    var db = _a.app.parent.db;
    db.set('boards', []).write();
    db.set('lists', []).write();
    db.set('cards', []).write();
    return res.status(204).end();
});
exports.default = app;
//# sourceMappingURL=board-routes.js.map