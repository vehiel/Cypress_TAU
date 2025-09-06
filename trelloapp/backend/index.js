"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = exports.startServer = void 0;
var board_routes_1 = require("./api/board-routes");
var card_routes_1 = require("./api/card-routes");
var list_routes_1 = require("./api/list-routes");
var reset_routes_1 = require("./api/reset-routes");
var user_routes_1 = require("./api/user-routes");
var login_routes_1 = require("./api/login-routes");
var signup_routes_1 = require("./api/signup-routes");
var location_routes_1 = require("./api/location-routes");
var constants_1 = require("../constants");
var SERVER = constants_1.default.SERVER;
var startServer = function () {
    var jsonServer = require('json-server');
    var app = jsonServer.create();
    var auth = require('json-server-auth');
    var nocache = require('nocache');
    var busboy = require('connect-busboy');
    var history = require('connect-history-api-fallback');
    var middleware = require('./middleware');
    var router = jsonServer.router('./backend/data/database.json');
    app.db = router.db;
    app.use(history());
    app.use(jsonServer.defaults({ static: '.' }));
    app.use(nocache());
    app.use(busboy());
    app.use(jsonServer.bodyParser);
    app.use(middleware);
    app.use('/login', login_routes_1.default);
    app.use('/signup', signup_routes_1.default);
    app.use(jsonServer.rewriter({
        '/users/*': '/600/users/$1',
    }));
    app.use(auth);
    app.use('/boards', board_routes_1.default);
    app.use('/lists', list_routes_1.default);
    app.use('/cards', card_routes_1.default);
    app.use('/users', user_routes_1.default);
    app.use('/reset', reset_routes_1.default);
    app.use('/location', location_routes_1.default);
    app.use(router);
    var server = app.listen(SERVER);
    // const io = require('socket.io')(server);
    // io.on('connection', (socket) => {
    //   socket.on('boardCreated', (message) => {
    //     io.emit('boardCreated', message);
    //   });
    //   socket.on('boardsState', (message) => {
    //     io.emit('boardsState', message);
    //   });
    //   socket.on('boardDeleted', (id) => {
    //     io.emit('boardDeleted', id);
    //   });
    //   socket.on('boardUpdate', (id, message) => {
    //     io.emit('boardUpdate', id, message);
    //   });
    //   socket.on('listCreated', (boardId, message) => {
    //     io.emit('listCreated', boardId, message);
    //   });
    //   socket.on('listUpdated', (id, message) => {
    //     io.emit('listUpdated', id, message);
    //   });
    //   socket.on('listDeleted', (id) => {
    //     io.emit('listDeleted', id);
    //   });
    //   socket.on('cardCreated', (listId, message) => {
    //     io.emit('cardCreated', listId, message);
    //   });
    //   socket.on('cardUpdated', (id, message) => {
    //     io.emit('cardUpdated', id, message);
    //   });
    //   socket.on('cardDeleted', (id, message) => {
    //     io.emit('cardDeleted', id, message);
    //   });
    // });
    return null;
};
exports.startServer = startServer;
var createServer = function () {
    return (0, exports.startServer)();
};
exports.createServer = createServer;
//# sourceMappingURL=index.js.map