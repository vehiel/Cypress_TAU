"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./backend/index");
var vite_1 = require("vite");
var vite_plugin_istanbul_1 = require("vite-plugin-istanbul");
var vite_svg_loader_1 = require("vite-svg-loader");
var plugin_vue_1 = require("@vitejs/plugin-vue");
var vite_plugin_vue_env_1 = require("vite-plugin-vue-env");
var vite_tsconfig_paths_1 = require("vite-tsconfig-paths");
var constants_1 = require("./constants");
var APP = constants_1.default.APP, SERVER = constants_1.default.SERVER;
exports.default = (0, vite_1.defineConfig)({
    define: {
        'process.env': {}
    },
    plugins: [
        (0, plugin_vue_1.default)(),
        (0, vite_svg_loader_1.default)(),
        (0, vite_plugin_vue_env_1.default)(),
        (0, vite_plugin_istanbul_1.default)({
            exclude: ['node_modules', 'test/'],
            extension: ['.js', '.ts', '.vue'],
            include: 'src/*',
            cypress: true
        }),
        (0, index_1.createServer)(),
        (0, vite_tsconfig_paths_1.default)({ extensions: ['.ts', '.d.ts'] })
    ],
    server: {
        port: APP,
        proxy: {
            '^/api/.*': {
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, ''); },
                target: "http://localhost:".concat(SERVER)
            },
            '^/socket.io/.*': {
                changeOrigin: true,
                target: "http://localhost:".concat(SERVER),
            }
        }
    }
});
//# sourceMappingURL=vite.config.js.map