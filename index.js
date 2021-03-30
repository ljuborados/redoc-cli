#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
/* tslint:disable:no-implicit-dependencies */
var React = require("react");
var server_1 = require("react-dom/server");
var styled_components_1 = require("styled-components");
var handlebars_1 = require("handlebars");
var http_1 = require("http");
var path_1 = require("path");
var zlib = require("zlib");
// @ts-ignore
var redoc_1 = require("redoc");
var chokidar_1 = require("chokidar");
var fs_1 = require("fs");
var mkdirp = require("mkdirp");
var YargsParser = require("yargs");
var BUNDLES_DIR = path_1.dirname(require.resolve('redoc'));
/* tslint:disable-next-line */
YargsParser.command('serve <spec>', 'start the server', function (yargs) {
    yargs.positional('spec', {
        describe: 'path or URL to your spec'
    });
    yargs.options('title', {
        describe: 'Page Title',
        type: 'string'
    });
    yargs.option('s', {
        alias: 'ssr',
        describe: 'Enable server-side rendering',
        type: 'boolean'
    });
    yargs.option('p', {
        alias: 'port',
        type: 'number',
        "default": 8080
    });
    yargs.option('w', {
        alias: 'watch',
        type: 'boolean'
    });
    yargs.demandOption('spec');
    return yargs;
}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var config, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = {
                    ssr: argv.ssr,
                    title: argv.title,
                    watch: argv.watch,
                    templateFileName: argv.template,
                    templateOptions: argv.templateOptions || {},
                    redocOptions: getObjectOrJSON(argv.options)
                };
                console.log(config);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, serve(argv.port, argv.spec, config)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                handleError(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })
    .command('bundle <spec>', 'bundle spec into zero-dependency HTML-file', function (yargs) {
    yargs.positional('spec', {
        describe: 'path or URL to your spec'
    });
    yargs.option('o', {
        describe: 'Output file',
        alias: 'output',
        type: 'string',
        "default": 'redoc-static.html'
    });
    yargs.options('title', {
        describe: 'Page Title',
        type: 'string'
    });
    yargs.options('disableGoogleFont', {
        describe: 'Disable Google Font',
        type: 'boolean',
        "default": false
    });
    yargs.option('cdn', {
        describe: 'Do not include ReDoc source code into html page, use link to CDN instead',
        type: 'boolean',
        "default": false
    });
    yargs.demandOption('spec');
    return yargs;
}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var config, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = {
                    ssr: true,
                    output: argv.o,
                    cdn: argv.cdn,
                    title: argv.title,
                    disableGoogleFont: argv.disableGoogleFont,
                    templateFileName: argv.template,
                    templateOptions: argv.templateOptions || {},
                    redocOptions: getObjectOrJSON(argv.options)
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bundle(argv.spec, config)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                handleError(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })
    .demandCommand()
    .options('t', {
    alias: 'template',
    describe: 'Path to handlebars page template, see https://git.io/vh8fP for the example ',
    type: 'string'
})
    .options('templateOptions', {
    describe: 'Additional options that you want pass to template. Use dot notation, e.g. templateOptions.metaDescription'
})
    .options('options', {
    describe: 'ReDoc options, use dot notation, e.g. options.nativeScrollbars'
}).argv;
function serve(port, pathToSpec, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var spec, pageHTML, server, pathToSpecDirectory_1, watchOptions, watcher, log_1, handlePath_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, redoc_1.loadAndBundleSpec(pathToSpec)];
                case 1:
                    spec = _a.sent();
                    return [4 /*yield*/, getPageHTML(spec, pathToSpec, options)];
                case 2:
                    pageHTML = _a.sent();
                    server = http_1.createServer(function (request, response) {
                        console.time('GET ' + request.url);
                        if (request.url === '/redoc.standalone.js') {
                            respondWithGzip(fs_1.createReadStream(path_1.join(BUNDLES_DIR, 'redoc.standalone.js'), 'utf8'), request, response, {
                                'Content-Type': 'application/javascript'
                            });
                        }
                        else if (request.url === '/') {
                            respondWithGzip(pageHTML, request, response, {
                                'Content-Type': 'text/html'
                            });
                        }
                        else if (request.url === '/spec.json') {
                            var specStr = JSON.stringify(spec, null, 2);
                            respondWithGzip(specStr, request, response, {
                                'Content-Type': 'application/json'
                            });
                        }
                        else {
                            response.writeHead(404);
                            response.write('Not found');
                            response.end();
                        }
                        console.timeEnd('GET ' + request.url);
                    });
                    console.log();
                    server.listen(port, function () { return console.log("Server started: http://127.0.0.1:" + port); });
                    if (options.watch && fs_1.existsSync(pathToSpec)) {
                        pathToSpecDirectory_1 = path_1.resolve(path_1.dirname(pathToSpec));
                        watchOptions = {
                            ignored: [/(^|[\/\\])\../, /___jb_[a-z]+___$/],
                            ignoreInitial: true
                        };
                        watcher = chokidar_1.watch(pathToSpecDirectory_1, watchOptions);
                        log_1 = console.log.bind(console);
                        handlePath_1 = function (_path) { return __awaiter(_this, void 0, void 0, function () {
                            var e_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        return [4 /*yield*/, redoc_1.loadAndBundleSpec(pathToSpec)];
                                    case 1:
                                        spec = _a.sent();
                                        return [4 /*yield*/, getPageHTML(spec, pathToSpec, options)];
                                    case 2:
                                        pageHTML = _a.sent();
                                        log_1('Updated successfully');
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_3 = _a.sent();
                                        console.error('Error while updating: ', e_3.message);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        watcher
                            .on('change', function (path) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                log_1(path + " changed, updating docs");
                                handlePath_1(path);
                                return [2 /*return*/];
                            });
                        }); })
                            .on('add', function (path) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                log_1("File " + path + " added, updating docs");
                                handlePath_1(path);
                                return [2 /*return*/];
                            });
                        }); })
                            .on('addDir', function (path) {
                            log_1("\u2197  Directory " + path + " added. Files in here will trigger reload.");
                        })
                            .on('error', function (error) { return console.error("Watcher error: " + error); })
                            .on('ready', function () { return log_1("\uD83D\uDC40  Watching " + pathToSpecDirectory_1 + " for changes..."); });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function bundle(pathToSpec, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var start, spec, pageHTML, sizeInKiB, time;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = Date.now();
                    return [4 /*yield*/, redoc_1.loadAndBundleSpec(pathToSpec)];
                case 1:
                    spec = _a.sent();
                    return [4 /*yield*/, getPageHTML(spec, pathToSpec, __assign(__assign({}, options), { ssr: true }))];
                case 2:
                    pageHTML = _a.sent();
                    mkdirp.sync(path_1.dirname(options.output));
                    fs_1.writeFileSync(options.output, pageHTML);
                    sizeInKiB = Math.ceil(Buffer.byteLength(pageHTML) / 1024);
                    time = Date.now() - start;
                    console.log("\n\uD83C\uDF89 bundled successfully in: " + options.output + " (" + sizeInKiB + " KiB) [\u23F1 " + time / 1000 + "s]");
                    return [2 /*return*/];
            }
        });
    });
}
function getPageHTML(spec, pathToSpec, _a) {
    var ssr = _a.ssr, cdn = _a.cdn, title = _a.title, disableGoogleFont = _a.disableGoogleFont, templateFileName = _a.templateFileName, templateOptions = _a.templateOptions, _b = _a.redocOptions, redocOptions = _b === void 0 ? {} : _b;
    return __awaiter(this, void 0, void 0, function () {
        var html, css, state, redocStandaloneSrc, specUrl, store, sheet, template;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!ssr) return [3 /*break*/, 3];
                    console.log('Prerendering docs');
                    specUrl = redocOptions.specUrl || (isURL(pathToSpec) ? pathToSpec : undefined);
                    return [4 /*yield*/, redoc_1.createStore(spec, specUrl, redocOptions)];
                case 1:
                    store = _c.sent();
                    sheet = new styled_components_1.ServerStyleSheet();
                    html = server_1.renderToString(sheet.collectStyles(React.createElement(redoc_1.Redoc, { store: store })));
                    css = sheet.getStyleTags();
                    return [4 /*yield*/, store.toJS()];
                case 2:
                    state = _c.sent();
                    if (!cdn) {
                        redocStandaloneSrc = fs_1.readFileSync(path_1.join(BUNDLES_DIR, 'redoc.standalone.js'));
                    }
                    _c.label = 3;
                case 3:
                    templateFileName = templateFileName ? templateFileName : path_1.join(__dirname, './template.hbs');
                    template = handlebars_1.compile(fs_1.readFileSync(templateFileName).toString());
                    return [2 /*return*/, template({
                            redocHTML: "\n    <div id=\"redoc\">" + ((ssr && html) || '') + "</div>\n    <script>\n    " + ((ssr && "const __redoc_state = " + sanitizeJSONString(JSON.stringify(state)) + ";") || '') + "\n\n    var container = document.getElementById('redoc');\n    Redoc." + (ssr
                                ? 'hydrate(__redoc_state, container)'
                                : "init(\"spec.json\", " + JSON.stringify(redocOptions) + ", container)") + ";\n\n    </script>",
                            redocHead: ssr
                                ? (cdn
                                    ? '<script src="https://unpkg.com/redoc@next/bundles/redoc.standalone.js"></script>'
                                    : "<script>" + redocStandaloneSrc + "</script>") + css
                                : '<script src="redoc.standalone.js"></script>',
                            title: title || spec.info.title || 'ReDoc documentation',
                            disableGoogleFont: disableGoogleFont,
                            templateOptions: templateOptions
                        })];
            }
        });
    });
}
// credits: https://stackoverflow.com/a/9238214/1749888
function respondWithGzip(contents, request, response, headers) {
    if (headers === void 0) { headers = {}; }
    var compressedStream;
    var acceptEncoding = request.headers['accept-encoding'] || '';
    if (acceptEncoding.match(/\bdeflate\b/)) {
        response.writeHead(200, __assign(__assign({}, headers), { 'content-encoding': 'deflate' }));
        compressedStream = zlib.createDeflate();
    }
    else if (acceptEncoding.match(/\bgzip\b/)) {
        response.writeHead(200, __assign(__assign({}, headers), { 'content-encoding': 'gzip' }));
        compressedStream = zlib.createGzip();
    }
    else {
        response.writeHead(200, headers);
        if (typeof contents === 'string') {
            response.write(contents);
            response.end();
        }
        else {
            contents.pipe(response);
        }
        return;
    }
    if (typeof contents === 'string') {
        compressedStream.write(contents);
        compressedStream.pipe(response);
        compressedStream.end();
        return;
    }
    else {
        contents.pipe(compressedStream).pipe(response);
    }
}
function isURL(str) {
    return /^(https?:)\/\//m.test(str);
}
function sanitizeJSONString(str) {
    return escapeClosingScriptTag(escapeUnicode(str));
}
// see http://www.thespanner.co.uk/2011/07/25/the-json-specification-is-now-wrong/
function escapeClosingScriptTag(str) {
    return str.replace(/<\/script>/g, '<\\/script>');
}
// see http://www.thespanner.co.uk/2011/07/25/the-json-specification-is-now-wrong/
function escapeUnicode(str) {
    return str.replace(/\u2028|\u2029/g, function (m) { return '\\u202' + (m === '\u2028' ? '8' : '9'); });
}
function handleError(error) {
    console.error(error.stack);
    process.exit(1);
}
function getObjectOrJSON(options) {
    switch (typeof options) {
        case 'object':
            return options;
        case 'string':
            try {
                if (fs_1.existsSync(options) && fs_1.lstatSync(options).isFile()) {
                    return JSON.parse(fs_1.readFileSync(options, 'utf-8'));
                }
                else {
                    return JSON.parse(options);
                }
            }
            catch (e) {
                console.log("Encountered error:\n\n" + options + "\n\nis neither a file with a valid JSON object neither a stringified JSON object.");
                handleError(e);
            }
        default:
            return {};
    }
}
