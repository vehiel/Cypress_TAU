"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
var getUserId = function (headers) {
    if (headers.hasOwnProperty('authorization') &&
        headers['authorization'].length) {
        var base64Url = headers.authorization.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var userData = JSON.parse(Buffer.from(base64, 'base64'));
        var userId = parseInt(userData.sub);
        return userId;
    }
    return false;
};
exports.getUserId = getUserId;
//# sourceMappingURL=getUserId.js.map