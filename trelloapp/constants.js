"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    APP: parseInt(process.env.APP) || 3000,
    SERVER: parseInt(process.env.SERVER) || 3001
};
//# sourceMappingURL=constants.js.map