"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var validate = function (checks, body, res) {
    var errors = [];
    // run validations
    checks.forEach(function (check) {
        !body[check] && errors.push("'".concat(check, "'"));
    });
    // create message
    var messageFormatted = errors.length > 1
        ? errors.slice(0, -1).join(', ') + ' and ' + errors.slice(-1)
        : errors[0];
    errors.length &&
        res.status(400).jsonp({
            error: "You need to provide ".concat(messageFormatted, " in request body.")
        });
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map