"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var Board_vue_1 = require("../views/Board.vue");
var BoardList_vue_1 = require("@/components/boardList/BoardList.vue");
var Login_vue_1 = require("@/components/Login.vue");
var NotFound_vue_1 = require("@/components/NotFound.vue");
var Signup_vue_1 = require("@/components/Signup.vue");
var Pricing_vue_1 = require("@/components/Pricing.vue");
exports.routes = [
    {
        component: BoardList_vue_1.default,
        name: 'BoardList',
        path: '/',
    },
    {
        component: Login_vue_1.default,
        name: 'Login',
        path: '/login',
    },
    {
        component: Signup_vue_1.default,
        name: 'Signup',
        path: '/signup',
    },
    {
        component: Pricing_vue_1.default,
        name: 'Pricing',
        path: '/pricing',
    },
    {
        component: Board_vue_1.default,
        name: 'Board',
        path: '/board/:board',
    },
    {
        component: NotFound_vue_1.default,
        path: '/:pathMatch(.*)*',
        name: 'Page not found',
    },
];
//# sourceMappingURL=routes.js.map