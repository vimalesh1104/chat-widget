(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/animations'), require('rxjs/operators'), require('socket.io-client'), require('rxjs/Observable'), require('@angular/common/http'), require('@angular/common'), require('primeng/api'), require('@angular/router'), require('rxjs/add/operator/map'), require('rxjs/internal/observable/throwError')) :
    typeof define === 'function' && define.amd ? define('@pics-module/chat-redbird-ai', ['exports', '@angular/core', 'rxjs', '@angular/animations', 'rxjs/operators', 'socket.io-client', 'rxjs/Observable', '@angular/common/http', '@angular/common', 'primeng/api', '@angular/router', 'rxjs/add/operator/map', 'rxjs/internal/observable/throwError'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["pics-module"] = global["pics-module"] || {}, global["pics-module"]["chat-redbird-ai"] = {}), global.ng.core, global.rxjs, global.ng.animations, global.rxjs.operators, global.io, global.rxjs.Observable, global.ng.common.http, global.ng.common, global.api, global.ng.router, global.rxjs["add/operator/map"], global.rxjs["internal/observable/throwError"]));
})(this, (function (exports, i0, rxjs, animations, operators, io, Observable, i1, i5, api, i1$1, map, throwError) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var io__default = /*#__PURE__*/_interopDefaultLegacy(io);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

    var ChatRedbirdAiService = /** @class */ (function () {
        function ChatRedbirdAiService() {
        }
        return ChatRedbirdAiService;
    }());
    ChatRedbirdAiService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatRedbirdAiService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ChatRedbirdAiService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatRedbirdAiService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatRedbirdAiService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var RBACINFO = /** @class */ (function () {
        function RBACINFO() {
            this.apiHost = '';
            this.tokenKey = '';
        }
        return RBACINFO;
    }());
    var Environment = /** @class */ (function () {
        function Environment() {
        }
        return Environment;
    }());

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) { if (f !== void 0 && typeof f !== "function")
            throw new TypeError("Function expected"); return f; }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
            var context = {};
            for (var p in contextIn)
                context[p] = p === "access" ? {} : contextIn[p];
            for (var p in contextIn.access)
                context.access[p] = contextIn.access[p];
            context.addInitializer = function (f) { if (done)
                throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0)
                    continue;
                if (result === null || typeof result !== "object")
                    throw new TypeError("Object expected");
                if (_ = accept(result.get))
                    descriptor.get = _;
                if (_ = accept(result.set))
                    descriptor.set = _;
                if (_ = accept(result.init))
                    initializers.unshift(_);
            }
            else if (_ = accept(result)) {
                if (kind === "field")
                    initializers.unshift(_);
                else
                    descriptor[key] = _;
            }
        }
        if (target)
            Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    }
    ;
    function __runInitializers(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    }
    ;
    function __propKey(x) {
        return typeof x === "symbol" ? x : "".concat(x);
    }
    ;
    function __setFunctionName(f, name, prefix) {
        if (typeof name === "symbol")
            name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    }
    ;
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }
    function __addDisposableResource(env, value, async) {
        if (value !== null && value !== void 0) {
            if (typeof value !== "object" && typeof value !== "function")
                throw new TypeError("Object expected.");
            var dispose;
            if (async) {
                if (!Symbol.asyncDispose)
                    throw new TypeError("Symbol.asyncDispose is not defined.");
                dispose = value[Symbol.asyncDispose];
            }
            if (dispose === void 0) {
                if (!Symbol.dispose)
                    throw new TypeError("Symbol.dispose is not defined.");
                dispose = value[Symbol.dispose];
            }
            if (typeof dispose !== "function")
                throw new TypeError("Object not disposable.");
            env.stack.push({ value: value, dispose: dispose, async: async });
        }
        else if (async) {
            env.stack.push({ async: true });
        }
        return value;
    }
    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    function __disposeResources(env) {
        function fail(e) {
            env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async)
                        return Promise.resolve(result).then(next, function (e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError)
                throw env.error;
        }
        return next();
    }
    var tslib_es6 = {
        __extends: __extends,
        __assign: __assign,
        __rest: __rest,
        __decorate: __decorate,
        __param: __param,
        __metadata: __metadata,
        __awaiter: __awaiter,
        __generator: __generator,
        __createBinding: __createBinding,
        __exportStar: __exportStar,
        __values: __values,
        __read: __read,
        __spread: __spread,
        __spreadArrays: __spreadArrays,
        __spreadArray: __spreadArray,
        __await: __await,
        __asyncGenerator: __asyncGenerator,
        __asyncDelegator: __asyncDelegator,
        __asyncValues: __asyncValues,
        __makeTemplateObject: __makeTemplateObject,
        __importStar: __importStar,
        __importDefault: __importDefault,
        __classPrivateFieldGet: __classPrivateFieldGet,
        __classPrivateFieldSet: __classPrivateFieldSet,
        __classPrivateFieldIn: __classPrivateFieldIn,
        __addDisposableResource: __addDisposableResource,
        __disposeResources: __disposeResources,
    };

    var Store = /** @class */ (function () {
        function Store(initialState) {
            this._state$ = new rxjs.BehaviorSubject(initialState);
            this.state$ = this._state$.asObservable();
        }
        Object.defineProperty(Store.prototype, "state", {
            get: function () {
                return this._state$.getValue();
            },
            enumerable: false,
            configurable: true
        });
        Store.prototype.setState = function (nextState) {
            this._state$.next(nextState);
        };
        return Store;
    }());

    var PermissionStore = /** @class */ (function (_super) {
        __extends(PermissionStore, _super);
        function PermissionStore() {
            return _super.call(this, {}) || this;
        }
        PermissionStore.prototype.setStore = function (data) {
            if (data) {
                this.setState(Object.assign(Object.assign({}, this.state), data));
            }
        };
        PermissionStore.prototype.getStore = function (type) {
            if (type === void 0) { type = 'P'; }
            if (type === 'P')
                return rxjs.of(this.state);
            else
                return rxjs.of(this.state);
        };
        PermissionStore.prototype.flat = function (array) {
            var _this = this;
            var result = [];
            if (array) {
                array.forEach(function (item) {
                    result.push(item);
                    if (item && Array.isArray(item)) {
                        result = result.concat(_this.flat(item));
                    }
                });
            }
            return result;
        };
        return PermissionStore;
    }(Store));
    PermissionStore.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PermissionStore, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    PermissionStore.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PermissionStore });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PermissionStore, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return []; } });

    var DataStoreService = /** @class */ (function () {
        function DataStoreService() {
            this.currentStoreSubject = new rxjs.BehaviorSubject({});
            this.currentStore = this.currentStoreSubject.asObservable();
            // test code
        }
        DataStoreService.prototype.setData = function (key, value) {
            var currentStore = this.getCurrentStore();
            currentStore[key] = value;
            this.currentStoreSubject.next(currentStore);
        };
        DataStoreService.prototype.setObject = function (value) {
            this.currentStoreSubject.next(value);
        };
        DataStoreService.prototype.getData = function (key) {
            var currentStore = this.getCurrentStore();
            return currentStore[key];
        };
        DataStoreService.prototype.clearStore = function () {
            var currentStore = this.getCurrentStore();
            Object.keys(currentStore).forEach(function (key) {
                delete currentStore[key];
            });
            this.currentStoreSubject.next(currentStore);
        };
        DataStoreService.prototype.getCurrentStore = function () {
            return this.currentStoreSubject.value;
        };
        return DataStoreService;
    }());
    DataStoreService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DataStoreService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DataStoreService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DataStoreService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DataStoreService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return []; } });

    var fadeInOut = animations.trigger('fadeInOut', [
        animations.transition(':enter', [animations.style({ opacity: 0 }), animations.animate(250)]),
        animations.transition('* => void', [
            animations.animate(250, animations.style({
                opacity: 0
            }))
        ])
    ]);
    var fadeIn = animations.trigger('fadeIn', [
        animations.transition(':enter', [animations.style({ opacity: 0 }), animations.animate(500)]),
        animations.transition(':leave', [animations.style({ opacity: 0 }), animations.animate(1)])
    ]);

    var ChatBotRasaService = /** @class */ (function () {
        // chatBotUrl = 'environment.ChatBotNew';
        function ChatBotRasaService(http, _storeservice) {
            var _this = this;
            this.http = http;
            this._storeservice = _storeservice;
            this.getMessages = function () {
                return new Observable.Observable(function (observer) {
                    _this.socket.on('bot_uttered', function (message) {
                        observer.next(message);
                    });
                });
            };
            this._storeservice.currentStore.subscribe(function (res) {
                if (res['RBACORG'] && res['RBACORG'] !== '') {
                    _this.RBACORG = res['RBACORG'];
                    _this.url = _this.RBACORG['apiHost'] ? _this.RBACORG['apiHost'] : 'http://localhost:3000/api';
                    _this.tokenKey = _this.RBACORG['tokenKey'];
                    _this.chatBotUrl = _this.RBACORG.environment['ChatBotNew'];
                }
            });
        }
        ChatBotRasaService.prototype.connect = function (url) {
            var _this = this;
            var tokenvalues = sessionStorage.getItem('fbToken') ? sessionStorage.getItem('fbToken') : '';
            var username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '';
            var email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '';
            var id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '';
            this.socket = io__default["default"](url, {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: Infinity,
                forceNew: true,
                secure: true,
                query: {
                    token: tokenvalues ? tokenvalues : '',
                    username: username ? username : 'Tulasireddy',
                    email: email ? email : 'tulasi@cardinality.ai',
                    id: id ? id : '1234'
                }
            });
            this.socket.on('connect', function () {
                _this.socket.emit('session_request', { session_id: _this.socket.id });
            });
            this.socket.on('session_confirm', function (_remote_id) {
                //not to be empty
            });
            this.socket.on('connect_error', function (error) {
                console.log(error);
            });
            this.socket.on('error', function (error) {
                console.log(error);
            });
            this.socket.on('disconnect', function (reason) {
                console.log(reason);
            });
        };
        ChatBotRasaService.prototype.sendMessage = function (message) {
            var tokenvalues = sessionStorage.getItem('fbToken') ? sessionStorage.getItem('fbToken') : '';
            var username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '';
            var email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '';
            var id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '';
            this.socket.emit('user_uttered', {
                message: message,
                customData: {
                    token: tokenvalues ? tokenvalues : '',
                    username: username ? username : '',
                    email: email ? email : '',
                    id: id ? id : ''
                }
            });
        };
        ChatBotRasaService.prototype.disconnect = function () {
            this.socket.on('disconnect', function (reason) {
                console.log(reason);
            });
        };
        ChatBotRasaService.prototype.searchMenus = function (modal) {
            var inputRequest = {
                query: modal
            };
            return this.http.post(this.chatBotUrl + 'search', inputRequest);
        };
        ChatBotRasaService.prototype.sendFeedback = function (modal) {
            var inputRequest = {
                user: sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '',
                question: modal.question,
                isLiked: modal.islike ? true : false
            };
            return this.http.post(this.chatBotUrl + 'feedback', inputRequest);
        };
        return ChatBotRasaService;
    }());
    ChatBotRasaService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatBotRasaService, deps: [{ token: i1__namespace.HttpClient }, { token: DataStoreService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    ChatBotRasaService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatBotRasaService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatBotRasaService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: DataStoreService }]; } });

    var ChatAvatarComponent = /** @class */ (function () {
        function ChatAvatarComponent() {
        }
        return ChatAvatarComponent;
    }());
    ChatAvatarComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatAvatarComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    ChatAvatarComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatAvatarComponent, selector: "app-chat-avatar", inputs: { image: "image" }, ngImport: i0__namespace, template: ' <img [attr.src]="image" class="avatar" /> ', isInline: true, styles: ["\n      .avatar {\n        height: 30px;\n        width: 30px;\n        border-radius: 50%;\n        float: left;\n        margin-right: 10px;\n        background-color: #fff;\n        padding: 5px;\n        border: 1px solid #ddd;\n      }\n    "] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatAvatarComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'app-chat-avatar',
                        template: ' <img [attr.src]="image" class="avatar" /> ',
                        styles: [
                            "\n      .avatar {\n        height: 30px;\n        width: 30px;\n        border-radius: 50%;\n        float: left;\n        margin-right: 10px;\n        background-color: #fff;\n        padding: 5px;\n        border: 1px solid #ddd;\n      }\n    "
                        ]
                    }]
            }], propDecorators: { image: [{
                    type: i0.Input
                }] } });

    var ChatInputComponent = /** @class */ (function () {
        function ChatInputComponent() {
            this.buttonText = 'Send';
            this.focus = new i0.EventEmitter();
            this.clearSearch = new rxjs.Subject();
            this.send = new i0.EventEmitter();
            this.searchto = new i0.EventEmitter();
            this.dismiss = new i0.EventEmitter();
        }
        ChatInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.focus.subscribe(function () { return _this.focusMessage(); });
            this.clearSearch.subscribe(function () {
                _this.clearMessage();
                _this.focusMessage();
            });
        };
        ChatInputComponent.prototype.focusMessage = function () {
            this.message.nativeElement.focus();
        };
        ChatInputComponent.prototype.getMessage = function () {
            return this.message.nativeElement.value;
        };
        ChatInputComponent.prototype.clearMessage = function () {
            this.message.nativeElement.value = '';
        };
        ChatInputComponent.prototype.onSubmit = function () {
            var message = this.getMessage();
            if (message.trim() === '') {
                return;
            }
            this.send.emit({ message: message });
            this.clearMessage();
            this.focusMessage();
        };
        ChatInputComponent.prototype.searchText = function () {
            var message = this.getMessage();
            if (message.trim() === '') {
                return;
            }
            this.searchto.emit({ message: message });
        };
        return ChatInputComponent;
    }());
    ChatInputComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatInputComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    ChatInputComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatInputComponent, selector: "app-chat-input", inputs: { buttonText: "buttonText", focus: "focus", clearSearch: "clearSearch" }, outputs: { send: "send", searchto: "searchto", dismiss: "dismiss" }, viewQueries: [{ propertyName: "message", first: true, predicate: ["message"], descendants: true }], ngImport: i0__namespace, template: "\n    <textarea\n      type=\"text\"\n      class=\"chat-input-text\"\n      placeholder=\"Type message...\"\n      #message\n      (keypress)=\"searchText()\"\n      (keydown.enter)=\"onSubmit()\"\n      (keyup.enter)=\"message.value = ''\"\n      (keyup.escape)=\"dismiss.emit()\"></textarea>\n    <button type=\"submit\" class=\"chat-input-submit\" (click)=\"onSubmit()\">\n      {{ buttonText }}\n    </button>\n  ", isInline: true, styles: [".chat-input-text{margin:5px 0 0 14px;height:29px;width:70%;border:0;resize:none;overflow:auto;outline:none;box-shadow:none;font-size:12px!important;background-color:inherit;color:#a3a3a3;padding:4px}.chat-input-text::-webkit-input-placeholder{color:inherit!important}.chat-input-text::-moz-placeholder{color:inherit!important}.chat-input-text::-ms-input-placeholder{color:inherit!important}.chat-input-submit{margin:5px 12px;float:right;background-color:inherit;color:inherit;font-size:12px!important;padding:4px;border:0;outline:none}.chat-input-submit:focus,.chat-input-submit:visited{outline:none!important}\n"], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatInputComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'app-chat-input',
                        template: "\n    <textarea\n      type=\"text\"\n      class=\"chat-input-text\"\n      placeholder=\"Type message...\"\n      #message\n      (keypress)=\"searchText()\"\n      (keydown.enter)=\"onSubmit()\"\n      (keyup.enter)=\"message.value = ''\"\n      (keyup.escape)=\"dismiss.emit()\"></textarea>\n    <button type=\"submit\" class=\"chat-input-submit\" (click)=\"onSubmit()\">\n      {{ buttonText }}\n    </button>\n  ",
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./chat-input.component.scss']
                    }]
            }], propDecorators: { buttonText: [{
                    type: i0.Input
                }], focus: [{
                    type: i0.Input
                }], clearSearch: [{
                    type: i0.Input
                }], send: [{
                    type: i0.Output
                }], searchto: [{
                    type: i0.Output
                }], dismiss: [{
                    type: i0.Output
                }], message: [{
                    type: i0.ViewChild,
                    args: ['message']
                }] } });

    var KeysPipe = /** @class */ (function () {
        function KeysPipe() {
        }
        KeysPipe.prototype.transform = function (value, _args) {
            var keys = [];
            // tslint:disable-next-line:forin
            for (var key in value) {
                keys.push(key);
            }
            return keys;
        };
        return KeysPipe;
    }());
    KeysPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: KeysPipe, deps: [], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    KeysPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: KeysPipe, name: "keys" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: KeysPipe, decorators: [{
                type: i0.Pipe,
                args: [{ name: 'keys' }]
            }] });

    var rand = function (max) { return Math.floor(Math.random() * max); };
    var ChatWidgetComponent = /** @class */ (function () {
        function ChatWidgetComponent(chatService, _storeservice) {
            var _this = this;
            this._storeservice = _storeservice;
            this.theme = 'blue';
            this.botName = 'Bot';
            this.botAvatar = '../../../../assets/images/redbird_ai.png';
            this.userAvatar = '../../../../assets/images/chat_avator.png';
            this.opened = false;
            this.spin = false;
            this.menuList = [];
            this.openFeedback = false;
            this.selectedmessage = '';
            this.selectQuestion = '';
            this._visible = false;
            this.RBACORG = new RBACINFO();
            this.focus = new rxjs.Subject();
            this.clearSearch = new rxjs.Subject();
            this.messages = [];
            this.currentMessages = [];
            this.chatService = chatService;
            this.orgSubs = this._storeservice.currentStore.subscribe(function (res) {
                if (res['RBACORG'] && res['RBACORG'] !== '') {
                    _this.RBACORG = res['RBACORG'];
                    _this.environment = _this.RBACORG['environment'];
                    _this.orgId = parseInt(_this.RBACORG['orgID']);
                    if (_this.environment) {
                        _this.chatService.connect(_this.environment['ChatBot']);
                    }
                }
            });
        }
        Object.defineProperty(ChatWidgetComponent.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (visible) {
                var _this = this;
                this._visible = visible;
                if (this._visible) {
                    setTimeout(function () {
                        _this.scrollToBottom();
                        _this.focusMessage();
                    }, 0);
                }
            },
            enumerable: false,
            configurable: true
        });
        ChatWidgetComponent.prototype.addMessage = function (from, text, type, islike, isdislike, question) {
            this.spin = false;
            this.messages.unshift({
                from: from,
                text: text,
                type: type,
                date: new Date().getTime(),
                islike: islike,
                isdislike: isdislike,
                question: question
            });
            this.currentMessages.unshift({
                from: from,
                text: text,
                type: type,
                date: new Date().getTime(),
                islike: islike,
                isdislike: isdislike,
                question: question
            });
            this.scrollToBottom();
        };
        ChatWidgetComponent.prototype.scrollToBottom = function () {
            if (this.bottom !== undefined) {
                this.bottom.nativeElement.scrollIntoView();
            }
        };
        ChatWidgetComponent.prototype.focusMessage = function () {
            this.focus.next(true);
        };
        ChatWidgetComponent.prototype.ngOnInit = function () {
            this.initialize();
        };
        ChatWidgetComponent.prototype.initialize = function () {
            var _this = this;
            this.startingMessage = 'Hi, how can we help you?';
            this.client = {
                name: 'Guest User',
                status: 'online',
                avatar: this.userAvatar
            };
            this.operator = {
                name: this.botName,
                status: 'online',
                avatar: this.botAvatar
            };
            if (this.opened) {
                setTimeout(function () { return (_this.visible = true); }, 1000);
            }
            setTimeout(function () {
                _this.addMessage(_this.operator, _this.startingMessage, 'received', false, false, '');
            }, 1500);
            // setTimeout(() => {
            //   const startingMessage = {
            //     data: ['Referrals', 'Expenses'],
            //     filter: '',
            //     msg: 'Would you like to check the below items ?',
            //     response_type: 'questions',
            //     url: ''
            //   };
            //   this.addMessage(this.operator, startingMessage, 'received', false, false, '');
            // }, 1500);
            this.chatService.getMessages().subscribe(function (message) {
                setTimeout(function () {
                    _this.spin = false;
                    var msg = isValidJSONString(message.text) ? JSON.parse(message.text) : message.text;
                    _this.addMessage(_this.operator, msg, 'received', false, false, _this.selectQuestion);
                    setTimeout(function () {
                        _this.scrollToBottom();
                        _this.focusMessage();
                    }, 0);
                }, 500);
            });
        };
        ChatWidgetComponent.prototype.toggleChat = function () {
            this.visible = !this.visible;
        };
        ChatWidgetComponent.prototype.sendMessage = function (_a) {
            var message = _a.message;
            this.selectQuestion = message;
            if (message.trim() === '') {
                return;
            }
            var currentMessage = this.sendMenuKey(message);
            this.addMessage(this.client, message, 'sent', false, false, this.selectQuestion);
            this.spin = true;
            this.chatService.sendMessage(currentMessage);
        };
        ChatWidgetComponent.prototype.searchMessage = function (_a) {
            var _this = this;
            var message = _a.message;
            if (message.trim() === '') {
                return;
            }
            this.chatService
                .searchMenus(message)
                .pipe(operators.debounceTime(2000))
                .subscribe(function (x) {
                if (x) {
                    _this.menuList = x;
                }
            });
        };
        ChatWidgetComponent.prototype.handleKeyboardEvent = function (event) {
            if (event.key === '/') {
                this.focusMessage();
            }
            if (event.key === '?' && !this._visible) {
                this.toggleChat();
            }
        };
        ChatWidgetComponent.prototype.closeChatBot = function () {
            this.messages = [];
            this.chatService.disconnect();
            this.startingMessage = 'Hi, how can we help you?';
        };
        ChatWidgetComponent.prototype.showMessage = function (message) {
            if (message.text && message.text.response_type) {
                return message.text.response_type === 'table' ||
                    message.text.response_type === 'text' ||
                    message.text.response_type === 'questions' ||
                    message.text.response_type === 'link'
                    ? true
                    : false;
            }
            return false;
        };
        ChatWidgetComponent.prototype.showTable = function (message, type) {
            if (message.text && message.text.response_type) {
                return message.text.response_type === type ? true : false;
            }
            return false;
        };
        ChatWidgetComponent.prototype.getHeaderName = function (message) {
            if (message.text && message.text.data) {
                return message.text.data[0];
            }
            return {};
        };
        ChatWidgetComponent.prototype.getColumnData = function (message) {
            if (message.text && message.text.data) {
                return message.text.data;
            }
            return [];
        };
        ChatWidgetComponent.prototype.raiseQuestions = function (message) {
            var _this = this;
            this.sendMessage({ message: message });
            setTimeout(function () {
                _this.scrollToBottom();
                _this.focusMessage();
            }, 0);
        };
        ChatWidgetComponent.prototype.selectMessage = function (message) {
            var _this = this;
            this.toggleShow();
            this.toClearSearch();
            this.sendMessage({ message: message });
            setTimeout(function () {
                _this.scrollToBottom();
                _this.focusMessage();
            }, 0);
        };
        ChatWidgetComponent.prototype.toClearSearch = function () {
            this.clearSearch.next(true);
        };
        ChatWidgetComponent.prototype.downloadFile = function (message) {
            if (message.text.url) {
                window.open(message.text.url, '_blank');
            }
        };
        ChatWidgetComponent.prototype.toggleShow = function () {
            this.menuList = [];
        };
        ChatWidgetComponent.prototype.activeLike = function (message) {
            this.selectedmessage = message;
            this.currentMessages = this.currentMessages.map(function (x) {
                return {
                    type: x.type,
                    text: x.text,
                    islike: x.text === message.text ? true : x.islike,
                    isdislike: x.text === message.text ? false : x.isdislike,
                    from: x.from,
                    date: x.date,
                    question: x.question
                };
            });
            this.openFeedback = true;
        };
        ChatWidgetComponent.prototype.activeDisLike = function (message) {
            this.selectedmessage = message;
            this.currentMessages = this.currentMessages.map(function (x) {
                return {
                    type: x.type,
                    text: x.text,
                    islike: x.text === message.text ? false : x.islike,
                    isdislike: x.text === message.text ? true : x.isdislike,
                    from: x.from,
                    date: x.date,
                    question: x.question
                };
            });
            this.openFeedback = true;
        };
        ChatWidgetComponent.prototype.getLikeStatus = function (message) {
            var isLike = this.currentMessages.filter(function (x) { return x.text === message.text && x.islike; });
            return isLike.length > 0 ? true : false;
        };
        ChatWidgetComponent.prototype.getDisLikeStatus = function (message) {
            var isDisLike = this.currentMessages.filter(function (x) { return x.text === message.text && x.isdislike; });
            return isDisLike.length > 0 ? true : false;
        };
        ChatWidgetComponent.prototype.sendFeedback = function (message) {
            var feedbackQue = this.currentMessages.filter(function (x) { return x.text === message.text; });
            if (feedbackQue.length > 0) {
                this.chatService.sendFeedback(feedbackQue[0]).subscribe(function (_x) {
                    //not to be empty
                });
            }
            this.closeFeedback();
        };
        ChatWidgetComponent.prototype.closeFeedback = function () {
            this.openFeedback = false;
        };
        ChatWidgetComponent.prototype.sendMenuKey = function (message) {
            if (message === 'Referrals') {
                return 'orref menu';
            }
            else if (message === 'Expenses') {
                return 'orexp menu';
            }
            else {
                return message;
            }
        };
        ChatWidgetComponent.prototype.getChatBotInfo = function (_modal) {
        };
        return ChatWidgetComponent;
    }());
    ChatWidgetComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatWidgetComponent, deps: [{ token: ChatBotRasaService }, { token: DataStoreService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ChatWidgetComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatWidgetComponent, selector: "app-chat-widget", inputs: { theme: "theme", botName: "botName", botAvatar: "botAvatar", userAvatar: "userAvatar", url: "url", startingMessage: "startingMessage", opened: "opened", visible: "visible" }, host: { listeners: { "document:keypress": "handleKeyboardEvent($event)" } }, viewQueries: [{ propertyName: "bottom", first: true, predicate: ["bottom"], descendants: true }], ngImport: i0__namespace, template: "<div class=\"wrapper {{ theme }}\">\r\n  <div class=\"chat-box\" *ngIf=\"visible\" [@fadeInOut]=\"visible\">\r\n    <div class=\"chat-box-body\">\r\n      <div class=\"chat-box-header\">\r\n        <div class=\"\">\r\n          <div class=\"operator-status\">\r\n            <!-- {{ operator.status }}\r\n            <span class=\"operator-status-online\">\u25CF</span> -->\r\n            <button class=\"chat-button-header\" (click)=\"toggleChat()\">\u2715</button>\r\n          </div>\r\n          <app-chat-avatar class=\"main-avatar\" [image]=\"operator.avatar\"></app-chat-avatar>\r\n          <h3 class=\"operator-name d-none\">\r\n            {{ operator.name }}\r\n          </h3>\r\n        </div>\r\n      </div>\r\n      <div class=\"chat-box-main\">\r\n        <div class=\"chat-message-bottom\" #bottom></div>\r\n        <ng-container *ngFor=\"let message of messages\">\r\n          <div class=\"chat-message m-2 mb-4\" [class.chat-message-received]=\"message.type === 'received'\" [@fadeIn]\r\n            [class.chat-message-sent]=\"message.type === 'sent'\">\r\n            <div>\r\n              <app-chat-avatar [image]=\"message.from.avatar\" class=\"chat-message-from-avatar\"></app-chat-avatar>\r\n              <div class=\"chat-message-text\">\r\n                {{ showMessage(message) ? message?.text?.msg : message?.text }}\r\n                <table *ngIf=\"showTable(message, 'table')\" class=\"table table-bordered\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th class=\"px-1 py-1\" *ngFor=\"let head of getHeaderName(message) | keys\">\r\n                        {{ head }}\r\n                      </th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr *ngFor=\"let item of getColumnData(message).slice(0, 4)\">\r\n                      <td class=\"px-1 py-1\" *ngFor=\"let list of item | keys\">\r\n                        {{ item[list] }}\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n                <div *ngIf=\"showTable(message, 'table')\">\r\n                  <a href=\"javascript:void(0)\" (click)=\"getChatBotInfo(message)\">Click here to view more</a>.\r\n                </div>\r\n                <div *ngIf=\"showTable(message, 'link')\">\r\n                  <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"downloadFile(message)\">\r\n                    <em class=\"pi pi-download mr-1\" title=\"Download\"></em>Download</button>.\r\n                </div>\r\n                <ul class=\"list-group questions mt-2\" *ngIf=\"showTable(message, 'questions')\">\r\n                  <li class=\"list-group-item p-2 mb-1 border border-primary\" role=\"button\"\r\n                    *ngFor=\"let item of getColumnData(message)\" (click)=\"raiseQuestions(item)\">\r\n                    {{ item }}\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n            <div class=\"chat-message-date\">\r\n              {{ message.date | date: 'short' }}\r\n\r\n              <span style=\"bottom: -6px\" *ngIf=\"message.type === 'received' && message.question\">\r\n                <span class=\"thumbs\">\r\n                  <span title=\"Like\" ngClass=\"{{ getLikeStatus(message) ? 'thumbs-up active' : 'thumbs-up' }}\"\r\n                    (click)=\"activeLike(message)\"></span>\r\n                  <span title=\"Dislike\" ngClass=\"{{ getDisLikeStatus(message) ? 'thumbs-down active' : 'thumbs-down' }}\"\r\n                    (click)=\"activeDisLike(message)\"></span>\r\n                </span>\r\n              </span>\r\n            </div>\r\n            <div class=\"comment mt-n1 mb-3\" *ngIf=\"openFeedback && selectedmessage === message\">\r\n              <p>Enter your feedback here</p>\r\n              <div class=\"feedback-bottom\">\r\n                <input placeholder=\"Type here to share your feedback\" id=\"comment-input\" type=\"text\" maxlength=\"1000\" />\r\n                <div class=\"feedback-send\" (click)=\"sendFeedback(message)\">Send</div>\r\n              </div>\r\n              <span class=\"close-comment\">\r\n                <em class=\"pi pi-times close-btn\" title=\"close\"\r\n                  style=\"width: 10px; height: 10px; vertical-align: top; font-size: 12px\"\r\n                  (click)=\"closeFeedback()\"></em>\r\n              </span>\r\n            </div>\r\n          </div>\r\n          <div class=\"typing\" *ngIf=\"spin\">\r\n            <div class=\"bubble\">\r\n              <div class=\"ellipsis one\"></div>\r\n              <div class=\"ellipsis two\"></div>\r\n              <div class=\"ellipsis three\"></div>\r\n            </div>\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n      <div class=\"chat-box-footer\">\r\n        <app-chat-input (send)=\"sendMessage($event)\" (searchto)=\"searchMessage($event)\" (dismiss)=\"toggleChat()\"\r\n          (focus)=\"(focus)\" [clearSearch]=\"clearSearch\"></app-chat-input>\r\n      </div>\r\n      <div class=\"autosuggest\" *ngIf=\"menuList.length > 0\">\r\n        <div class=\"close-btn d-flex align-items-center justify-content-end mx-2 my-2\">\r\n          <a href=\"javascript:void(0)\" class=\"auto-suggestions-close text-right\" (click)=\"toggleShow()\">\r\n            <em class=\"pi pi-times close-btn\" title=\"close\"></em>\r\n          </a>\r\n        </div>\r\n        <ul class=\"mb-0 mx-2\">\r\n          <li *ngFor=\"let item of menuList\" (click)=\"selectMessage(item)\">\r\n            {{ item }}\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <button class=\"chat-button\" (click)=\"toggleChat()\">\r\n    <span [@fadeIn] *ngIf=\"visible\">\u2715</span>\r\n    <span [@fadeIn] *ngIf=\"!visible\">\r\n      <img src=\"../../../../../assets/images/chat.png\" width=\"20\" alt=\"chat-icon\" />\r\n    </span>\r\n  </button>\r\n</div>", styles: ["*{box-sizing:border-box}.wrapper{position:absolute;top:0;bottom:0;width:100vw}.chat-button{z-index:99;width:50px;height:50px;position:absolute;bottom:1px;right:10px;box-shadow:0 5px 40px #00000029;background:var(--btn);border-radius:50%;border:none;outline:none;color:var(--bg-light);font-size:32px}.chat-button-header{z-index:1;font-weight:bold;color:#fff;border:1px solid #fff;background-color:inherit;padding:5px 9px;margin-left:5px}.chat-box{position:fixed;left:0;height:100vh;width:100vw;margin:0;display:flex;box-shadow:0 5px 40px #00000029;background:#eaf0f7!important;z-index:99}.chat-box-hidden{display:none}.chat-box-header{padding:10px;color:#fff;display:flex;justify-content:center;align-items:center}.chat-box-main{flex:1;width:100%;background:#fff;display:flex;flex-direction:column-reverse;overflow:auto}.chat-box-body{flex:1;display:flex;flex-direction:column;padding:15px}.chat-box-body:before{content:\"\";position:absolute;left:0;right:0;top:0px;width:100%;height:130px;background-color:#2c2863;border-top-left-radius:10px;border-top-right-radius:10px}.chat-box-footer{height:50px;border-radius:5px;background-color:#fff;padding:0 10px}.chat-box-footer chat-input{display:flex;background-color:#fff;border:1px solid #d1cdcd;justify-content:space-between}.operator-name{margin:0;padding:1px}.operator-status{float:right;padding:4px}.operator-status span{margin-left:4px}.operator-status-online{color:#7cfc00}.operator-status-offline{color:red}.operator-avatar{height:30px;width:30px;border-radius:50%;float:left;margin-right:10px}.chat-message{display:block;width:auto;align-self:flex-start;flex-direction:row;max-width:80%;word-wrap:break-word}.chat-message-date{font-size:9px;color:#8d898d;padding:3px 5px 5px}.chat-message-from-avatar{height:35px;width:35px;border-radius:50%}.chat-message-text{padding:6px 10px;border-radius:8px}.chat-message-received .chat-message-text{min-width:290px;background:#e6ebf1;margin-left:40px;border-bottom-left-radius:0;font-size:13px}.chat-message-received .chat-message-text:before{display:none;position:absolute;content:\" \";left:-10px;bottom:0;border-right:solid 10px #eaf0f7;border-top:solid 10px transparent;z-index:0}.chat-message-received .chat-message-date{margin-left:45px}.chat-message-received .chat-message-from-avatar{position:absolute;top:0;left:0;bottom:0}.chat-message-sent{align-self:flex-end}.chat-message-sent .chat-message-from{float:right}.chat-message-sent .chat-message-text{background:#2c2863;margin-right:10px;border-bottom-right-radius:0;font-size:13px;color:#fff}.chat-message-sent .chat-message-text:after{display:none;position:absolute;content:\" \";right:-10px;bottom:0;border-left:solid 10px #2c2863;border-top:solid 10px transparent;z-index:0}.chat-message-sent .chat-message-date{text-align:right;padding-right:45px}.chat-message-sent .chat-message-from-avatar{display:none;position:absolute;top:0;right:0;bottom:0}.blue .chat-button{background:var(--btn)}.blue .chat-box{background:#2c2863}.grey .chat-button{background:#454549}.grey .chat-box{background:#454549}.red .chat-button{background:#DD0031}.red .chat-box{background:#DD0031}@media (min-width: 576px){.chat-button{display:block}.chat-button-header{display:none}.chat-box{top:35px;left:auto;bottom:32px;right:40px;height:auto;width:440px;border-radius:10px}}.typing{position:absolute;left:10px}.typing .bubble{background:#eaeaea;padding:8px 13px 9px}.ellipsis{width:5px;height:5px;display:inline-block;background:#b7b7b7;border-radius:50%;animation:bounce 1.3s linear infinite}.one{animation-delay:.6s}.two{animation-delay:.5s}.three{animation-delay:.8s}.bubble{position:relative;display:inline-block;margin-bottom:5px;color:red;font-size:.7em;padding:10px 10px 10px 12px;border-radius:20px}@keyframes bounce{30%{transform:translateY(-2px)}60%{transform:translateY(0)}80%{transform:translateY(2px)}to{transform:translateY(0);opacity:.5}}@media (min-width: 768px){.chat-box{height:auto}}@media (min-width: 992px){.chat-box{height:auto}}.questions li:hover{background-color:#2c2863;color:#fff}.questions li{border-radius:15px;color:#2c2863;text-transform:capitalize}.autosuggest{position:absolute;top:auto;right:auto;left:auto;bottom:115px;transform:translateY(38px);will-change:transform;float:left;min-width:10rem;padding:0;margin:.125rem 0 0;font-size:13px;color:#212529;text-align:left;background-color:#fff;background-clip:padding-box;border-top-left-radius:15px;border-top-right-radius:15px;border:1px solid rgba(0,0,0,.15);z-index:99;width:93%}.autosuggest ul{list-style:none;height:240px;overflow:auto}.autosuggest li{cursor:pointer;font-size:13px;padding:10px;margin:0;border-bottom:solid 1px #efefef}.autosuggest .auto-suggestions-close .close-btn{font-size:13px;color:#000}.autosuggest li:hover{color:#fff;background-color:#007cc3}.autosuggest ul::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #0000004d;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#f5f5f5}.autosuggest ul::-webkit-scrollbar{width:10px;background-color:#f5f5f5}.autosuggest ul::-webkit-scrollbar-thumb{background-color:#007cc3;border:2px solid #555555}.chat-box .comment p{font-size:13px;width:90%;margin-bottom:14px!important;line-height:16px;text-align:left}.chat-box .comment #comment-input{border:0;border-radius:3px;display:inline-block;width:100%;background-color:#fff!important;padding:5px 20% 5px 10px;box-sizing:border-box;font-size:13px!important;font-weight:400;font-style:normal;line-height:18px;color:#333;box-shadow:0 0 8px #ddd;height:40px}.chat-box .close-comment{display:block;position:absolute;right:8px;top:8px;line-height:20px;text-align:center;cursor:pointer}.chat-box .feedback-send{width:35px;float:right;position:relative;color:#007cc3;font-size:13px;margin-top:-30px;margin-right:10px;border-radius:2px;cursor:pointer}.chat-box .thumbs{float:right;margin-right:-5px}.chat-box .thumbs-up{width:18px;height:18px;margin-right:14px;cursor:pointer;float:left;color:#555;background-image:url(../../../../../../assets/images/chabot/like-inactive.svg);background-repeat:no-repeat;margin-top:0;background-size:contain}.chat-box .thumbs-down{width:18px;height:18px;cursor:pointer;float:left;color:#555;background-image:url(../../../../../../assets/images/chabot/dislike-inactive.svg);background-repeat:no-repeat;margin-top:3px;background-size:contain}.chat-box .thumbs-down.active{background-image:url(../../../../../../assets/images/chabot/dislike-active.svg)}.chat-box .thumbs-up.active{color:#007cc3;background-image:url(../../../../../../assets/images/chabot/like-active.svg)}.chat-box .comment{padding:10px 15px;top:20px;left:0;min-width:290px;margin-left:40px;width:calc(100% - 40px);border-radius:4px;z-index:99;color:#333;background-color:#fff;box-shadow:0 0 8px #ddd;-webkit-box-shadow:0 0 8px 0 #ddd}.chat-box .comment #comment-input::placeholder{font-size:13px}\n"], components: [{ type: ChatAvatarComponent, selector: "app-chat-avatar", inputs: ["image"] }, { type: ChatInputComponent, selector: "app-chat-input", inputs: ["buttonText", "focus", "clearSearch"], outputs: ["send", "searchto", "dismiss"] }], directives: [{ type: i5__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "keys": KeysPipe, "date": i5__namespace.DatePipe }, animations: [fadeInOut, fadeIn] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatWidgetComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'app-chat-widget',
                        templateUrl: './chat-widget.component.html',
                        styleUrls: ['./chat-widget.component.scss'],
                        animations: [fadeInOut, fadeIn]
                    }]
            }], ctorParameters: function () { return [{ type: ChatBotRasaService }, { type: DataStoreService }]; }, propDecorators: { bottom: [{
                    type: i0.ViewChild,
                    args: ['bottom']
                }], theme: [{
                    type: i0.Input
                }], botName: [{
                    type: i0.Input
                }], botAvatar: [{
                    type: i0.Input
                }], userAvatar: [{
                    type: i0.Input
                }], url: [{
                    type: i0.Input
                }], startingMessage: [{
                    type: i0.Input
                }], opened: [{
                    type: i0.Input
                }], visible: [{
                    type: i0.Input
                }], handleKeyboardEvent: [{
                    type: i0.HostListener,
                    args: ['document:keypress', ['$event']]
                }] } });
    function isValidJSONString(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }

    var ChatRedbirdAiComponent = /** @class */ (function () {
        function ChatRedbirdAiComponent(permissionStore, _storeservice) {
            this.permissionStore = permissionStore;
            this._storeservice = _storeservice;
            this.RBACORG = new RBACINFO();
        }
        ChatRedbirdAiComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.chatEvent.subscribe(function (val) {
                _this.RBACORG = val.RBACORG;
                _this.PERMISSION = val.PERMISSION;
                _this._storeservice.setData('RBACORG', _this.RBACORG);
                _this.permissionStore.setStore(_this.PERMISSION);
            });
        };
        return ChatRedbirdAiComponent;
    }());
    ChatRedbirdAiComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatRedbirdAiComponent, deps: [{ token: PermissionStore }, { token: DataStoreService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ChatRedbirdAiComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatRedbirdAiComponent, selector: "chat-redbird-ai", inputs: { RBACORG: "RBACORG", PERMISSION: "PERMISSION", chatEvent: "chatEvent" }, ngImport: i0__namespace, template: "\n      <app-chat-widget botName=\"Cardinality\" theme=\"blue\"></app-chat-widget>\n  ", isInline: true, components: [{ type: ChatWidgetComponent, selector: "app-chat-widget", inputs: ["theme", "botName", "botAvatar", "userAvatar", "url", "startingMessage", "opened", "visible"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatRedbirdAiComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'chat-redbird-ai',
                        template: "\n      <app-chat-widget botName=\"Cardinality\" theme=\"blue\"></app-chat-widget>\n  ",
                        styles: []
                    }]
            }], ctorParameters: function () { return [{ type: PermissionStore }, { type: DataStoreService }]; }, propDecorators: { RBACORG: [{
                    type: i0.Input
                }], PERMISSION: [{
                    type: i0.Input
                }], chatEvent: [{
                    type: i0.Input
                }] } });

    var AlertService = /** @class */ (function () {
        function AlertService(router) {
            var _this = this;
            this.router = router;
            this.subject = new rxjs.Subject();
            this.keepAfterRouteChange = false;
            // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
            router.events.subscribe(function (event) {
                if (event instanceof i1$1.NavigationStart) {
                    if (_this.keepAfterRouteChange) {
                        // only keep for a single route change
                        _this.keepAfterRouteChange = false;
                    }
                    else {
                        // clear alert messages
                        _this.clear();
                    }
                }
            });
        }
        AlertService.prototype.getAlert = function () {
            return this.subject.asObservable();
        };
        AlertService.prototype.success = function (message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.alert(AlertType.Success, message, keepAfterRouteChange);
        };
        AlertService.prototype.error = function (message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.alert(AlertType.Error, message, keepAfterRouteChange);
        };
        AlertService.prototype.info = function (message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.alert(AlertType.Info, message, keepAfterRouteChange);
        };
        AlertService.prototype.warn = function (message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.alert(AlertType.Warning, message, keepAfterRouteChange);
        };
        AlertService.prototype.alert = function (type, message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.keepAfterRouteChange = keepAfterRouteChange;
            this.subject.next({ type: type, message: message });
        };
        AlertService.prototype.clear = function () {
            // clear alerts
            this.subject.next({});
        };
        return AlertService;
    }());
    AlertService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertService, deps: [{ token: i1__namespace$1.Router }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    AlertService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace$1.Router }]; } });
    var AlertType;
    (function (AlertType) {
        AlertType[AlertType["Success"] = 0] = "Success";
        AlertType[AlertType["Error"] = 1] = "Error";
        AlertType[AlertType["Info"] = 2] = "Info";
        AlertType[AlertType["Warning"] = 3] = "Warning";
    })(AlertType || (AlertType = {}));
    var Alert = /** @class */ (function () {
        function Alert() {
        }
        return Alert;
    }());
    var UserGroupDto = /** @class */ (function () {
        function UserGroupDto(data) {
            Object.assign(this, data);
        }
        return UserGroupDto;
    }());
    var UserRolePageDto = /** @class */ (function () {
        function UserRolePageDto(data) {
            Object.assign(this, data);
        }
        return UserRolePageDto;
    }());
    var UserRoleDto = /** @class */ (function () {
        function UserRoleDto(data) {
            Object.assign(this, data);
        }
        return UserRoleDto;
    }());
    var UserDto = /** @class */ (function () {
        function UserDto(data) {
            Object.assign(this, data);
        }
        return UserDto;
    }());
    var AccessManagementConfig = /** @class */ (function () {
        function AccessManagementConfig() {
        }
        return AccessManagementConfig;
    }());
    AccessManagementConfig.EndPoint = {
        Organization: {
            getOrganizationList: '/org/organization/all',
            getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
        }
    };

    var HttpService = /** @class */ (function () {
        function HttpService(http, _storeservice) {
            var _this = this;
            this.http = http;
            this._storeservice = _storeservice;
            this.overrideUrl = true;
            this.baseUrl = '';
            this.headers = new i1.HttpHeaders()
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('role', 'role=CP_PUBLIC');
            this.showSpinner = new rxjs.BehaviorSubject(false);
            this.outsideShowSpinner = new rxjs.BehaviorSubject(false);
            this._storeservice.currentStore.subscribe(function (res) {
                if (res['RBACORG'] && res['RBACORG'] !== '') {
                    _this.RBACORG = res['RBACORG'];
                    _this.url = _this.RBACORG['apiHost'] ? _this.RBACORG['apiHost'] : 'http://localhost:3000/api';
                    _this.tokenKey = _this.RBACORG['tokenKey'];
                }
            });
            this.url1 = '';
        }
        HttpService.prototype.get = function (apiRoute) {
            return this.http.get("" + (this.url + apiRoute), {
                headers: this.getHttpNewHeaders()
            });
        };
        HttpService.prototype.post = function (apiRoute, body) {
            return this.http.post("" + (this.url + apiRoute), body, {
                headers: this.getHttpNewHeaders()
            });
        };
        HttpService.prototype.put = function (apiRoute, body) {
            return this.http.put("" + (this.url + apiRoute), body, {
                headers: this.getHttpNewHeaders()
            });
        };
        HttpService.prototype.patch = function (apiRoute, body) {
            return this.http.patch("" + (this.url + apiRoute), body, {
                headers: this.getHttpNewHeaders()
            });
        };
        HttpService.prototype.delete = function (apiRoute) {
            return this.http.delete("" + (this.url + apiRoute), {
                headers: this.getHttpNewHeaders()
            });
        };
        HttpService.prototype.getHttpHeaders = function () {
            return new i1.HttpHeaders().set('key', 'value');
        };
        HttpService.prototype.getHttpNewHeaders = function () {
            return this.headers.set('Authorization', "Bearer " + this.getToken());
        };
        HttpService.prototype.getAttachmentHttpHeaders = function (contentType) {
            return new i1.HttpHeaders().set('Content-Type', contentType).set('x-ms-blob-type', 'BlockBlob');
        };
        HttpService.prototype.putUpload = function (apiRoute, body, contentType) {
            return this.http.put("" + (this.url1 + apiRoute), body, { headers: this.getAttachmentHttpHeaders(contentType) });
        };
        HttpService.prototype.putupload2 = function (apiRoute, body, contenttype) {
            return this.http
                .put("" + (this.url1 + apiRoute), body, {
                headers: this.getAttachmentHttpHeaders(contenttype),
                observe: 'response'
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        /**
         *
         * @param apiRoute
         * This function will download the stream file from the API service.
         * No HTTP required for this stream. So used Window.location.href to download the file
         */
        HttpService.prototype.getFormDownloaded = function (apiRoute) {
            window.location.href = "" + (this.url + apiRoute);
        };
        //common http service(optional)
        HttpService.prototype.handleError = function (error) {
            var _a, _b;
            var errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // Client-side errors
                errorMessage = "Error: " + error.error.message;
            }
            else {
                // Server-side errors
                errorMessage = "Error Code: " + error.status + "\nMessage: " + (((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.message) ? (_b = error === null || error === void 0 ? void 0 : error.error) === null || _b === void 0 ? void 0 : _b.message : error.message);
            }
            return throwError.throwError(errorMessage);
        };
        HttpService.prototype.getToken = function () {
            var token = this.tokenKey ? this.tokenKey : 'jwt-token';
            return sessionStorage.getItem(token);
        };
        return HttpService;
    }());
    HttpService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: HttpService, deps: [{ token: i1__namespace.HttpClient }, { token: DataStoreService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    HttpService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: HttpService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: HttpService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: DataStoreService }]; } });

    var ChatConfigComponent = /** @class */ (function () {
        function ChatConfigComponent() {
            this.text = 'Select theme';
            this.themeChange = new i0.EventEmitter();
            this.themes = ['blue', 'grey', 'red'];
        }
        ChatConfigComponent.prototype.setTheme = function (theme) {
            this.theme = theme;
            this.themeChange.emit(this.theme);
        };
        return ChatConfigComponent;
    }());
    ChatConfigComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatConfigComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    ChatConfigComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ChatConfigComponent, selector: "app-chat-config", inputs: { theme: "theme", text: "text" }, outputs: { themeChange: "themeChange" }, ngImport: i0__namespace, template: "\n    <div class=\"chat-config\">\n      {{ text }}\n      <button *ngFor=\"let item of themes\" class=\"btn\" [class.btn-active]=\"item === theme\" (click)=\"setTheme(item)\">\n        {{ item }}\n      </button>\n    </div>\n  ", isInline: true, styles: ["\n      .chat-config {\n        padding: 20px;\n      }\n      .btn {\n        padding: 5px;\n        margin: 0px 2px;\n        border: 1px solid #dedede;\n        outline: none;\n      }\n      .btn-active {\n        border: 1px solid #a0a0a0;\n      }\n      .btn:focus {\n        border: 1px solid #333;\n      }\n    "], directives: [{ type: i5__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ChatConfigComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'app-chat-config',
                        template: "\n    <div class=\"chat-config\">\n      {{ text }}\n      <button *ngFor=\"let item of themes\" class=\"btn\" [class.btn-active]=\"item === theme\" (click)=\"setTheme(item)\">\n        {{ item }}\n      </button>\n    </div>\n  ",
                        styles: [
                            "\n      .chat-config {\n        padding: 20px;\n      }\n      .btn {\n        padding: 5px;\n        margin: 0px 2px;\n        border: 1px solid #dedede;\n        outline: none;\n      }\n      .btn-active {\n        border: 1px solid #a0a0a0;\n      }\n      .btn:focus {\n        border: 1px solid #333;\n      }\n    "
                        ]
                    }]
            }], propDecorators: { theme: [{
                    type: i0.Input
                }], text: [{
                    type: i0.Input
                }], themeChange: [{
                    type: i0.Output
                }] } });

    var PicsChatRedbirdAiModule = /** @class */ (function () {
        function PicsChatRedbirdAiModule() {
        }
        return PicsChatRedbirdAiModule;
    }());
    PicsChatRedbirdAiModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PicsChatRedbirdAiModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    PicsChatRedbirdAiModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PicsChatRedbirdAiModule, declarations: [ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent, ChatConfigComponent, KeysPipe], imports: [i5.CommonModule], exports: [ChatWidgetComponent, ChatConfigComponent] });
    PicsChatRedbirdAiModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PicsChatRedbirdAiModule, providers: [ChatBotRasaService, i1.HttpClient, HttpService, AlertService, api.ConfirmationService, PermissionStore, DataStoreService], imports: [[i5.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PicsChatRedbirdAiModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent, ChatConfigComponent, KeysPipe
                        ],
                        imports: [i5.CommonModule],
                        exports: [ChatWidgetComponent, ChatConfigComponent],
                        entryComponents: [ChatWidgetComponent, ChatConfigComponent],
                        providers: [ChatBotRasaService, i1.HttpClient, HttpService, AlertService, api.ConfirmationService, PermissionStore, DataStoreService],
                        schemas: [i0.NO_ERRORS_SCHEMA]
                    }]
            }] });

    var CardiChatRedbirdAiModule = /** @class */ (function () {
        function CardiChatRedbirdAiModule() {
        }
        return CardiChatRedbirdAiModule;
    }());
    CardiChatRedbirdAiModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CardiChatRedbirdAiModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    CardiChatRedbirdAiModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CardiChatRedbirdAiModule, declarations: [ChatRedbirdAiComponent], imports: [PicsChatRedbirdAiModule], exports: [ChatRedbirdAiComponent] });
    CardiChatRedbirdAiModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CardiChatRedbirdAiModule, imports: [[
                PicsChatRedbirdAiModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CardiChatRedbirdAiModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            ChatRedbirdAiComponent
                        ],
                        imports: [
                            PicsChatRedbirdAiModule
                        ],
                        exports: [
                            ChatRedbirdAiComponent
                        ]
                    }]
            }] });

    /*
     * Public API Surface of chat-redbird-ai
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CardiChatRedbirdAiModule = CardiChatRedbirdAiModule;
    exports.ChatRedbirdAiComponent = ChatRedbirdAiComponent;
    exports.ChatRedbirdAiService = ChatRedbirdAiService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pics-module-chat-redbird-ai.umd.js.map
