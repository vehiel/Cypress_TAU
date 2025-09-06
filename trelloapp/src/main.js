"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
var vue_1 = require("vue");
var store_1 = require("@/store");
var App_vue_1 = require("./App.vue");
var vue3_click_away_1 = require("vue3-click-away");
var index_1 = require("@/router/index");
// import VueSocketIOExt from 'vue-socket.io-extended';
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:3000');
var pinia = (0, store_1.createPinia)();
(0, vue_1.createApp)(App_vue_1.default).use(pinia).use(vue3_click_away_1.default).use(index_1.router).mount('#app');
// .use(VueSocketIOExt, socket);
//# sourceMappingURL=main.js.map