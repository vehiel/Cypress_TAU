"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoardDetail = void 0;
var vue_router_1 = require("vue-router");
var axios_1 = require("axios");
var getBoardDetail = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var route, board, lists, qs, err_1, response;
        var _this = this;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    route = (0, vue_router_1.useRoute)();
                    this.loading = true;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("/api/boards/".concat(id))];
                case 2:
                    board = _c.sent();
                    this.board = board.data;
                    return [4 /*yield*/, axios_1.default.get("/api/lists?boardId=".concat(id))];
                case 3:
                    lists = _c.sent();
                    lists.data.sort(function (a, b) {
                        return a.order - b.order;
                    });
                    this.lists = lists.data;
                    if (lists.data.length)
                        this.createListInput = false;
                    // if there are no lists, don’t fetch cards
                    this.lists.forEach(function (list, index) {
                        _this.loadingListCards[_this.lists[index].id] = true;
                        axios_1.default.get("/api/cards?listId=".concat(list.id)).then(function (_a) {
                            var _b;
                            var data = _a.data;
                            data.sort(function (a, b) {
                                return a.order - b.order;
                            });
                            _this.lists[index].cards = [];
                            (_b = _this.lists[index].cards).push.apply(_b, data);
                            _this.loadingListCards[_this.lists[index].id] = false;
                        });
                    });
                    qs = (_a = route.query) === null || _a === void 0 ? void 0 : _a.card;
                    if (qs !== undefined) {
                        this.showCardModule(qs, true);
                    }
                    this.loading = false;
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _c.sent();
                    response = err_1.response;
                    this.loading = false;
                    this.loadingError.show = true;
                    this.loadingError.message = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.message;
                    this.loadingError.status = response === null || response === void 0 ? void 0 : response.status;
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.getBoardDetail = getBoardDetail;
//# sourceMappingURL=getBoardDetail.js.map