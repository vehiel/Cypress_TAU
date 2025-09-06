"use strict";
/* istanbul ignore file */
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
exports.installGoogleAuth = installGoogleAuth;
var googleAuth = (function () {
    var installClient = function () {
        var apiUrl = 'https://apis.google.com/js/api.js';
        return new Promise(function (resolve) {
            var script = document.createElement('script');
            script.src = apiUrl;
            script.onreadystatechange = script.onload = function () {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    setTimeout(function () {
                        resolve();
                    }, 500);
                }
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    };
    var initClient = function (config) {
        return new Promise(function (resolve, reject) {
            window.gapi.load('auth2', function () {
                window.gapi.auth2
                    .init(config)
                    .then(function () {
                    resolve(window.gapi);
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    var Auth = function () {
        var _this = this;
        this.GoogleAuth = null; /* window.gapi.auth2.getAuthInstance() */
        this.isAuthorized = false;
        this.isInit = false;
        this.prompt = null;
        this.isLoaded = function () {
            // tslint:disable-next-line
            console.warn('isLoaded() will be deprecated. You can use "this.$gAuth.isInit"');
            return !!_this.GoogleAuth;
        };
        this.load = function (config, prompt) {
            installClient()
                .then(function () {
                return initClient(config);
            })
                .then(function (gapi) {
                _this.GoogleAuth = gapi.auth2.getAuthInstance();
                _this.isInit = true;
                _this.prompt = prompt;
                _this.isAuthorized = _this.GoogleAuth.isSignedIn.get();
            })
                .catch(function (error) {
                console.error(error);
            });
        };
        this.signIn = function (successCallback, errorCallback) {
            return new Promise(function (resolve, reject) {
                if (!_this.GoogleAuth) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(false);
                    }
                    reject(false);
                    return;
                }
                _this.GoogleAuth.signIn()
                    .then(function (googleUser) {
                    if (typeof successCallback === 'function') {
                        successCallback(googleUser);
                    }
                    _this.isAuthorized = _this.GoogleAuth.isSignedIn.get();
                    resolve(googleUser);
                })
                    .catch(function (error) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(error);
                    }
                    reject(error);
                });
            });
        };
        this.getAuthCode = function (successCallback, errorCallback) {
            return new Promise(function (resolve, reject) {
                if (!_this.GoogleAuth) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(false);
                    }
                    reject(false);
                    return;
                }
                _this.GoogleAuth.grantOfflineAccess({ prompt: _this.prompt })
                    .then(function (resp) {
                    if (typeof successCallback === 'function') {
                        successCallback(resp.code);
                    }
                    resolve(resp.code);
                })
                    .catch(function (error) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(error);
                    }
                    reject(error);
                });
            });
        };
        this.signOut = function (successCallback, errorCallback) {
            return new Promise(function (resolve, reject) {
                if (!_this.GoogleAuth) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(false);
                    }
                    reject(false);
                    return;
                }
                _this.GoogleAuth.signOut()
                    .then(function () {
                    if (typeof successCallback === 'function') {
                        successCallback();
                    }
                    _this.isAuthorized = false;
                    resolve(true);
                })
                    .catch(function (error) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(error);
                    }
                    reject(error);
                });
            });
        };
    };
    return new Auth();
})();
function installGoogleAuth(options) {
    return __awaiter(this, void 0, void 0, function () {
        var GoogleAuthConfig, GoogleAuthDefaultConfig, prompt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    GoogleAuthConfig = null;
                    GoogleAuthDefaultConfig = {
                        scope: 'profile email',
                    };
                    prompt = 'select_account';
                    if (typeof options === 'object') {
                        GoogleAuthConfig = Object.assign(GoogleAuthDefaultConfig, options);
                        if (options.scope) {
                            GoogleAuthConfig.scope = options.scope;
                        }
                        if (options.prompt) {
                            prompt = options.prompt;
                        }
                        if (!options.clientId) {
                            // tslint:disable-next-line
                            console.warn('clientId is required');
                        }
                    }
                    else {
                        // tslint:disable-next-line
                        console.warn('invalid option type. Object type accepted only');
                    }
                    return [4 /*yield*/, googleAuth.load(GoogleAuthConfig, prompt)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, googleAuth];
            }
        });
    });
}
//# sourceMappingURL=GoogleAuth.js.map