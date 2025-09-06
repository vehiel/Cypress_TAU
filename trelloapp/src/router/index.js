"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var vue_router_1 = require("vue-router");
var routes_1 = require("./routes");
exports.router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)('/'),
    routes: routes_1.routes,
});
//# sourceMappingURL=index.js.map