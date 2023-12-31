        parcelRequire = (function (init) {
            // Save the require from previous bundle to this closure if any
            var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
            var nodeRequire = typeof require === 'function' && require;
            var modules = {};

            function localRequire(name, jumped) {
                if (name in modules) {
                    return modules[name];
                }

                // if we cannot find the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
                if (!jumped && currentRequire) {
                    return currentRequire(name, true);
                }

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) {
                    return previousRequire(name, true);
                }

                // Try the node require function if it exists.
                if (nodeRequire && typeof name === 'string') {
                    return nodeRequire(name);
                }

                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }

            localRequire.register = function register(id, exports) {
                modules[id] = exports;
            };

            modules = init(localRequire);
            localRequire.modules = modules;
            return localRequire;
        })(function (require) {
            function $parcel$interopDefault(a) {
                return a && a.__esModule ? {
                    d: a.default
                } : {
                    d: a
                };
            }

            function $pTw7$var$_toConsumableArray(arr) {
                return $pTw7$var$_arrayWithoutHoles(arr) || $pTw7$var$_iterableToArray(arr) || $pTw7$var$_nonIterableSpread();
            }

            function $pTw7$var$_nonIterableSpread() {
                throw new TypeError("Invalid attempt to spread non-iterable instance");
            }

            function $pTw7$var$_iterableToArray(iter) {
                if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
            }

            function $pTw7$var$_arrayWithoutHoles(arr) {
                if (Array.isArray(arr)) {
                    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
                        arr2[i] = arr[i];
                    }

                    return arr2;
                }
            }

            function $pTw7$var$_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function $pTw7$var$_defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function $pTw7$var$_createClass(Constructor, protoProps, staticProps) {
                if (protoProps) $pTw7$var$_defineProperties(Constructor.prototype, protoProps);
                if (staticProps) $pTw7$var$_defineProperties(Constructor, staticProps);
                return Constructor;
            } // import * as THREE from 'three'
            // import TrackballControls from 'three-trackballcontrols'
            // import './three/postprocessing'
            // THREE.TrackballControls = TrackballControls

            /*!
             * Three.js Wrapper
             * forked from https://github.com/zadvorsky/three.bas/blob/86931253240abadf68b7c62edb934b994693ed4a/examples/_js/root.js
             */


            var $pTw7$export$default =
                /*#__PURE__*/
                function () {
                    function THREERoot(params) {
                        var _this$camera$position,
                            _this = this;

                        $pTw7$var$_classCallCheck(this, THREERoot); // defaults

                        var _params$container = params.container,
                            container = _params$container === void 0 ? document.body : _params$container,
                            _params$fov = params.fov,
                            fov = _params$fov === void 0 ? 45 : _params$fov,
                            zNear = params.zNear,
                            zFar = params.zFar,
                            _params$cameraPositio = params.cameraPosition,
                            cameraPosition = _params$cameraPositio === void 0 ? [0, 0, 30] : _params$cameraPositio,
                            _params$createCameraC = params.createCameraControls,
                            createCameraControls = _params$createCameraC === void 0 ? false : _params$createCameraC,
                            _params$isAutoStart = params.isAutoStart,
                            isAutoStart = _params$isAutoStart === void 0 ? true : _params$isAutoStart,
                            _params$pixelRatio = params.pixelRatio,
                            pixelRatio = _params$pixelRatio === void 0 ? 1 : _params$pixelRatio,
                            _params$antialias = params.antialias,
                            antialias = _params$antialias === void 0 ? window.devicePixelRatio === 1 : _params$antialias,
                            _params$alpha = params.alpha,
                            alpha = _params$alpha === void 0 ? false : _params$alpha,
                            _params$clearColor = params.clearColor,
                            clearColor = _params$clearColor === void 0 ? 0x000000 : _params$clearColor,
                            aspect = params.aspect,
                            _params$canvas = params.canvas,
                            canvas = _params$canvas === void 0 ? document.createElement('canvas') : _params$canvas,
                            _params$speed = params.speed,
                            speed = _params$speed === void 0 ? 60 / 1000 : _params$speed,
                            interval = params.interval,
                            _params$firstTime = params.firstTime,
                            firstTime = _params$firstTime === void 0 ? 0 : _params$firstTime,
                            _params$isDev = params.isDev,
                            isDev = _params$isDev === void 0 ? false : _params$isDev;
                        this.speed = speed;
                        this.interval = interval;
                        this.time = this.firstTime = firstTime;
                        this.stopTime = 0; // maps and arrays

                        this.updateCallbacks = [];
                        this.resizeCallbacks = [];
                        this.objects = {}; // renderer

                        this.renderer = new THREE.WebGL1Renderer({
                            antialias: antialias,
                            alpha: alpha,
                            canvas: canvas
                        });
                        this.renderer.setPixelRatio(pixelRatio);
                        this.renderer.setClearColor(clearColor, alpha ? 0 : 1);
                        this.canvas = this.renderer.domElement; // container

                        this.container = typeof container === 'string' ? document.querySelector(container) : container;
                        !params.canvas && this.container.appendChild(this.canvas);
                        this.aspect = aspect || this.container.clientWidth / this.container.clientHeight;
                        this.setSize(); // camera

                        this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, zNear, zFar);

                        (_this$camera$position = this.camera.position).set.apply(_this$camera$position, $pTw7$var$_toConsumableArray(cameraPosition));

                        this.camera.updateProjectionMatrix(); // scene

                        this.scene = new THREE.Scene(); // resize handling

                        this.resize();
                        window.addEventListener('resize', function () {
                            _this.resize();
                        }); // tick / update / render

                        isAutoStart && this.start(); // optional camera controls

                        createCameraControls && this.createOrbitControls(); // pointer

                        this.raycaster = new THREE.Raycaster();
                        this.pointer = new THREE.Vector2(); // developer mode

                        if (isDev) {
                            document.addEventListener('keydown', function (_ref) {
                                var key = _ref.key;

                                if (key === 'Escape') {
                                    _this.toggle();
                                }
                            });
                        }
                    }

                    $pTw7$var$_createClass(THREERoot, [{
                        key: "setSize",
                        value: function setSize() {
                            if (this.aspect) {
                                if (this.container.clientWidth / this.container.clientHeight > this.aspect) {
                                    this.width = this.container.clientHeight * this.aspect;
                                    this.height = this.container.clientHeight;
                                } else {
                                    this.width = this.container.clientWidth;
                                    this.height = this.container.clientWidth / this.aspect;
                                }
                            } else {
                                this.width = this.container.clientWidth;
                                this.height = this.container.clientHeight;
                            }
                        }
                    }, {
                        key: "createOrbitControls",
                        value: function createOrbitControls() {
                            var _this2 = this;

                            if (!THREE.TrackballControls) {
                                console.error('TrackballControls.js file is not loaded.');
                                return;
                            }

                            this.controls = new THREE.TrackballControls(this.camera, this.canvas);
                            this.addUpdateCallback(function () {
                                _this2.controls.update();
                            });
                        }
                    }, {
                        key: "start",
                        value: function start() {
                            var _this3 = this;

                            var startTime = this.stopTime || this.firstTime;
                            requestAnimationFrame(function (timestamp) {
                                _this3.startTime = timestamp - startTime;
                                _this3.time = timestamp - _this3.startTime;
                            });
                            this.tick();
                        }
                    }, {
                        key: "tick",
                        value: function tick() {
                            var _this4 = this;


                            this.update();
                            this.render();
                            this.animationFrameId = requestAnimationFrame(function (timestamp) {
                                _this4.time = timestamp - _this4.startTime;

                                _this4.tick();
                            });
                        }
                    }, {
                        key: "update",
                        value: function update() {
                            var time = this.time * this.speed;
                            time = this.interval ? time % this.interval : time;
                            this.updateCallbacks.forEach(function (fn) {
                                fn(time);
                            });
                        }
                    }, {
                        key: "render",
                        value: function render() {
                            this.renderer.render(this.scene, this.camera);
                        }
                    }, {
                        key: "draw",
                        value: function draw() {
                            this.update();
                            this.render();
                        }
                    }, {
                        key: "stop",
                        value: function stop() {
                            cancelAnimationFrame(this.animationFrameId);
                            this.animationFrameId = null;
                            this.stopTime = this.time;
                        }
                    }, {
                        key: "reset",
                        value: function reset() {
                            this.stop();
                            this.stopTime = 0;
                        }
                    }, {
                        key: "toggle",
                        value: function toggle() {
                            this.animationFrameId ? this.stop() : this.start();
                        }
                    }, {
                        key: "addUpdateCallback",
                        value: function addUpdateCallback(callback) {
                            this.updateCallbacks.push(callback);
                        }
                    }, {
                        key: "addResizeCallback",
                        value: function addResizeCallback(callback) {
                            this.resizeCallbacks.push(callback);
                        }
                    }, {
                        key: "add",
                        value: function add(object, key) {
                            key && (this.objects[key] = object);
                            this.scene.add(object);
                        }
                    }, {
                        key: "addTo",
                        value: function addTo(object, parentKey, key) {
                            key && (this.objects[key] = object);
                            this.get(parentKey).add(object);
                        }
                    }, {
                        key: "get",
                        value: function get(key) {
                            return this.objects[key];
                        }
                    }, {
                        key: "remove",
                        value: function remove(o) {
                            var object;

                            if (typeof o === 'string') {
                                object = this.objects[o];
                            } else {
                                object = o;
                            }

                            if (object) {
                                object.parent.remove(object);
                                delete this.objects[o];
                            }
                        }
                    }, {
                        key: "resize",
                        value: function resize() {
                            this.container.style.width = '';
                            this.container.style.height = '';

                            if (this.aspect) {
                                this.aspect = this.container.clientWidth / this.container.clientHeight;
                            }

                            this.setSize();
                            this.camera.aspect = this.width / this.height;
                            this.camera.updateProjectionMatrix();
                            this.renderer.setSize(this.width, this.height);
                            this.resizeCallbacks.forEach(function (callback) {
                                callback();
                            });
                        }
                    }, {
                        key: "initPostProcessing",
                        value: function initPostProcessing(passes) {
                            var _this5 = this;

                            var size = this.renderer.getSize();
                            var pixelRatio = this.renderer.getPixelRatio();
                            size.width *= pixelRatio;
                            size.height *= pixelRatio;
                            var composer = this.composer = new THREE.EffectComposer(this.renderer, new THREE.WebGLRenderTarget(size.width, size.height, {
                                minFilter: THREE.LinearFilter,
                                magFilter: THREE.LinearFilter,
                                format: THREE.RGBAFormat,
                                stencilBuffer: false
                            }));
                            var renderPass = new THREE.RenderPass(this.scene, this.camera);
                            composer.addPass(renderPass);

                            for (var i = 0; i < passes.length; i++) {
                                var pass = passes[i];
                                pass.renderToScreen = i === passes.length - 1;
                                composer.addPass(pass);
                            }

                            this.renderer.autoClear = false;

                            this.render = function () {
                                _this5.renderer.clear();

                                composer.render();
                            };

                            this.addResizeCallback(function () {
                                composer.setSize(_this5.canvas.clientWidth * pixelRatio, _this5.canvas.clientHeight * pixelRatio);
                            });
                        }
                    }, {
                        key: "checkPointer",
                        value: function checkPointer(_ref2, meshs, handler, nohandler) {
                            var x = _ref2.x,
                                y = _ref2.y;
                            this.pointer.x = x / this.canvas.clientWidth * 2 - 1;
                            this.pointer.y = -(y / this.canvas.clientHeight) * 2 + 1;
                            this.raycaster.setFromCamera(this.pointer, this.camera);
                            var intersects = this.raycaster.intersectObjects(meshs);

                            if (intersects.length > 0) {
                                handler(intersects[0].object);
                                return true;
                            } else {
                                nohandler && nohandler();
                                return false;
                            }
                        }
                    }]);
                    return THREERoot;
                }();

            function $Moin$export$noop() { }

            function $IDtB$var$_toConsumableArray(arr) {
                return $IDtB$var$_arrayWithoutHoles(arr) || $IDtB$var$_iterableToArray(arr) || $IDtB$var$_nonIterableSpread();
            }

            function $IDtB$var$_nonIterableSpread() {
                throw new TypeError("Invalid attempt to spread non-iterable instance");
            }

            function $IDtB$var$_iterableToArray(iter) {
                if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
            }

            function $IDtB$var$_arrayWithoutHoles(arr) {
                if (Array.isArray(arr)) {
                    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
                        arr2[i] = arr[i];
                    }

                    return arr2;
                }
            }

            function $IDtB$var$_typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    $IDtB$var$_typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    $IDtB$var$_typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }

                return $IDtB$var$_typeof(obj);
            }

            function $IDtB$var$_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function $IDtB$var$_defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function $IDtB$var$_createClass(Constructor, protoProps, staticProps) {
                if (protoProps) $IDtB$var$_defineProperties(Constructor.prototype, protoProps);
                if (staticProps) $IDtB$var$_defineProperties(Constructor, staticProps);
                return Constructor;
            }

            var $IDtB$export$default =
                /*#__PURE__*/
                function () {
                    function Controller(options) {
                        $IDtB$var$_classCallCheck(this, Controller);
                        var closed = options.closed;
                        this.gui = new dat.GUI(options);
                        this.gui.closed = closed;
                        this.gui.destroy()

                    }
                    /**
                     * addData
                     *
                     * @param {Object} data
                     * @param {Object} [options={}]
                     * @param {function} [options.callback=noop]
                     * @param {function} [options.folder=gui]
                     * @memberof Controller
                     */


                    $IDtB$var$_createClass(Controller, [{
                        key: "addData",
                        value: function addData(data) {
                            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                            var _options$folder = options.folder,
                                folder = _options$folder === void 0 ? this.gui : _options$folder,
                                _options$callback = options.callback,
                                callback = _options$callback === void 0 ? $Moin$export$noop : _options$callback,
                                isUniform = options.isUniform;
                            var dataKeys = Object.keys(data);
                            var datData = {};
                            dataKeys.forEach(function (key) {
                                datData[key] = data[key].value;
                            });
                            dataKeys.forEach(function (key) {
                                var _data$key = data[key],
                                    isColor = _data$key.isColor,
                                    value = _data$key.value,
                                    range = _data$key.range,
                                    onChange = _data$key.onChange,
                                    listen = _data$key.listen;
                                var type;

                                if (isUniform) {
                                    switch ($IDtB$var$_typeof(value)) {
                                        case 'boolean':
                                            type = '1i';
                                            break;

                                        case 'array':
                                            type = value.length + 'f';
                                            break;

                                        case 'object':
                                            type = 't';
                                            break;

                                        default:
                                            type = '1f';
                                            break;
                                    }
                                }

                                var controller;

                                if (isColor) {
                                    controller = folder.addColor(datData, key);
                                } else {
                                    var guiRange = [];

                                    if (range) {
                                        guiRange = range;
                                    } else if (key === 'frame') {
                                        guiRange = [0, 1];
                                    } else if (typeof value === 'number') {
                                        if (value < 1 && value >= 0) {
                                            guiRange = [0, 1];
                                        } else {
                                            var diff = Math.pow(10, String(Math.floor(value)).length - 1) * 2;
                                            guiRange = [value - diff, value + diff];
                                        }
                                    }

                                    controller = folder.add.apply(folder, [datData, key].concat($IDtB$var$_toConsumableArray(guiRange)));
                                }

                                onChange && controller.onChange(function (value) {
                                    onChange(value);
                                });
                                listen && controller.listen();
                                callback(key, {
                                    type: type,
                                    value: value
                                });
                            });
                            return datData;
                        }
                    }, {
                        key: "addUniformData",
                        value: function addUniformData(data) {
                            var uniforms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                            return this.addData(data, {
                                callback: function callback(key, obj) {
                                    uniforms[key] = obj;
                                },
                                folder: options.folder,
                                isUniform: true
                            });
                        }
                    }, {
                        key: "addFolder",
                        value: function addFolder(name, isClosed) {
                            var folder = this.gui.addFolder(name);
                            !isClosed && folder.open();
                            return folder;
                        }
                    }]);
                    return Controller;
                }();

            // ASSET: scripts/modules/easing.js
            var $JJyr$exports = {};
            /*!
             * Terms of Use: Easing Functions (Equations)
             *
             * Open source under the MIT License and the 3-Clause BSD License.
             * Copyright © 2001 Robert Penner
             * http://robertpenner.com/easing_terms_of_use.html
             */

            /**
             * linear
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */

            function $JJyr$export$linear(t, b, c, d) {
                return c * t / d + b;
            }
            /**
             * easeInQuad
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.linear = $JJyr$export$linear;

            function $JJyr$export$easeInQuad(t, b, c, d) {
                return c * (t /= d) * t + b;
            }
            /**
             * easeOutQuad
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInQuad = $JJyr$export$easeInQuad;

            function $JJyr$export$easeOutQuad(t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            }
            /**
             * easeInOutQuad
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeOutQuad = $JJyr$export$easeOutQuad;

            function $JJyr$export$easeInOutQuad(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * (--t * (t - 2) - 1) + b;
            }
            /**
             * easeInCubic
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInOutQuad = $JJyr$export$easeInOutQuad;

            function $JJyr$export$easeInCubic(t, b, c, d) {
                return c * Math.pow(t / d, 3) + b;
            }
            /**
             * easeOutCubic
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInCubic = $JJyr$export$easeInCubic;

            function $JJyr$export$easeOutCubic(t, b, c, d) {
                return c * (Math.pow(t / d - 1, 3) + 1) + b;
            }
            /**
             * easeInOutCubic
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeOutCubic = $JJyr$export$easeOutCubic;

            function $JJyr$export$easeInOutCubic(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(t, 3) + b;
                return c / 2 * (Math.pow(t - 2, 3) + 2) + b;
            }
            /**
             * easeInQuart
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInOutCubic = $JJyr$export$easeInOutCubic;

            function $JJyr$export$easeInQuart(t, b, c, d) {
                return c * Math.pow(t / d, 4) + b;
            }
            /**
             * easeOutQuart
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInQuart = $JJyr$export$easeInQuart;

            function $JJyr$export$easeOutQuart(t, b, c, d) {
                return -c * (Math.pow(t / d - 1, 4) - 1) + b;
            }
            /**
             * easeInOutQuart
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeOutQuart = $JJyr$export$easeOutQuart;

            function $JJyr$export$easeInOutQuart(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(t, 4) + b;
                return -c / 2 * (Math.pow(t - 2, 4) - 2) + b;
            }
            /**
             * easeInQuint
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInOutQuart = $JJyr$export$easeInOutQuart;

            function $JJyr$export$easeInQuint(t, b, c, d) {
                return c * Math.pow(t / d, 5) + b;
            }
            /**
             * easeOutQuint
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInQuint = $JJyr$export$easeInQuint;

            function $JJyr$export$easeOutQuint(t, b, c, d) {
                return c * (Math.pow(t / d - 1, 5) + 1) + b;
            }
            /**
             * easeInOutQuint
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeOutQuint = $JJyr$export$easeOutQuint;

            function $JJyr$export$easeInOutQuint(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(t, 5) + b;
                return c / 2 * (Math.pow(t - 2, 5) + 2) + b;
            }
            /**
             * easeInSine
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInOutQuint = $JJyr$export$easeInOutQuint;

            function $JJyr$export$easeInSine(t, b, c, d) {
                return c * (1 - Math.cos(t / d * (Math.PI / 2))) + b;
            }
            /**
             * easeOutSine
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInSine = $JJyr$export$easeInSine;

            function $JJyr$export$easeOutSine(t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            }
            /**
             * easeInOutSine
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeOutSine = $JJyr$export$easeOutSine;

            function $JJyr$export$easeInOutSine(t, b, c, d) {
                return c / 2 * (1 - Math.cos(Math.PI * t / d)) + b;
            }
            /**
             * easeInExpo
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInOutSine = $JJyr$export$easeInOutSine;

            function $JJyr$export$easeInExpo(t, b, c, d) {
                return c * Math.pow(2, 10 * (t / d - 1)) + b;
            }
            /**
             * easeOutExpo
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInExpo = $JJyr$export$easeInExpo;

            function $JJyr$export$easeOutExpo(t, b, c, d) {
                return c * (-Math.pow(2, -10 * t / d) + 1) + b;
            }
            /**
             * easeInOutExpo
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeOutExpo = $JJyr$export$easeOutExpo;

            function $JJyr$export$easeInOutExpo(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
            /**
             * easeInCirc
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInOutExpo = $JJyr$export$easeInOutExpo;

            function $JJyr$export$easeInCirc(t, b, c, d) {
                return c * (1 - Math.sqrt(1 - (t /= d) * t)) + b;
            }
            /**
             * easeOutCirc
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeInCirc = $JJyr$export$easeInCirc;

            function $JJyr$export$easeOutCirc(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            }
            /**
             * easeInOutCirc
             *
             * @param {number} t time: 現在時刻 (0 ~ duration)
             * @param {number} b begin: 開始位置
             * @param {number} c change: 開始位置から終了位置までの変化量 (finish - begin)
             * @param {number} d duration: 全体時間
             * @returns {number} 現在位置
             */


            $JJyr$exports.easeOutCirc = $JJyr$export$easeOutCirc;

            function $JJyr$export$easeInOutCirc(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * (1 - Math.sqrt(1 - t * t)) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }

            $JJyr$exports.easeInOutCirc = $JJyr$export$easeInOutCirc;
            var $JJyr$export$easingList = ['linear', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc'];
            $JJyr$exports.easingList = $JJyr$export$easingList;

            function $Zk$var$_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function $Zk$var$_defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function $Zk$var$_createClass(Constructor, protoProps, staticProps) {
                if (protoProps) $Zk$var$_defineProperties(Constructor.prototype, protoProps);
                if (staticProps) $Zk$var$_defineProperties(Constructor, staticProps);
                return Constructor;
            }
            /**
             * アニメーション関数
             *
             * @param {AnimationCallback} fn アニメーションフレーム毎に実行するコールバック
             * @param {Object} [options={}] オプション
             * @param {number} [options.begin=0] 開始位置
             * @param {number} [options.finish=1] 終了位置
             * @param {number} [options.duration=500] 全体時間
             * @param {string} [options.easing='easeInOutCubic'] Easing function
             */


            function $Zk$export$animate(fn) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var _options$begin = options.begin,
                    begin = _options$begin === void 0 ? 0 : _options$begin,
                    _options$finish = options.finish,
                    finish = _options$finish === void 0 ? 1 : _options$finish,
                    _options$duration = options.duration,
                    duration = _options$duration === void 0 ? 500 : _options$duration,
                    _options$easing = options.easing,
                    easing = _options$easing === void 0 ? 'easeInOutCubic' : _options$easing,
                    _options$isRoop = options.isRoop,
                    isRoop = _options$isRoop === void 0 ? false : _options$isRoop,
                    onAfter = options.onAfter;
                var change = finish - begin;
                var easingFunction = $JJyr$exports[easing];
                var startTime;

                function tick(timestamp) {
                    var time = Math.min(duration, timestamp - startTime);
                    var position = easingFunction(time, begin, change, duration);
                    fn(position, time);

                    if (time === duration) {
                        if (isRoop) {
                            startTime = timestamp;
                            requestAnimationFrame(tick);
                        } else {
                            onAfter && onAfter();
                        }
                    } else {
                        requestAnimationFrame(tick);
                    }
                }

                requestAnimationFrame(function (timestamp) {
                    startTime = timestamp;
                    tick(timestamp);
                });
            }

            var $Zk$export$Animation =
                /*#__PURE__*/
                function () {
                    function Animation(fn, options) {
                        $Zk$var$_classCallCheck(this, Animation);
                        var _options$begin2 = options.begin,
                            begin = _options$begin2 === void 0 ? 0 : _options$begin2,
                            _options$finish2 = options.finish,
                            finish = _options$finish2 === void 0 ? 1 : _options$finish2,
                            _options$duration2 = options.duration,
                            duration = _options$duration2 === void 0 ? 500 : _options$duration2,
                            _options$easing2 = options.easing,
                            easing = _options$easing2 === void 0 ? 'easeInOutCubic' : _options$easing2,
                            _options$isRoop2 = options.isRoop,
                            isRoop = _options$isRoop2 === void 0 ? false : _options$isRoop2,
                            _options$isAuto = options.isAuto,
                            isAuto = _options$isAuto === void 0 ? true : _options$isAuto,
                            onBefore = options.onBefore,
                            onAfter = options.onAfter,
                            onStop = options.onStop;
                        this.fn = fn;
                        this.duration = duration;
                        this.easingFunction = $JJyr$exports[easing];
                        this.originalFrom = begin;
                        this.originalTo = finish;
                        this.isRoop = isRoop;
                        this.onBefore = onBefore;
                        this.onAfter = onAfter;
                        this.onStop = onStop;
                        isAuto && this.start();
                    }

                    $Zk$var$_createClass(Animation, [{
                        key: "tick",
                        value: function tick(timestamp) {
                            var time = Math.min(this.duration, timestamp - this.startTime);
                            var position = this.easingFunction(time, this.begin, this.change, this.duration);
                            this.fn(position, time);

                            if (time === this.duration) {
                                if (this.isRoop) {
                                    this.animate();
                                } else {
                                    this.onAfter && this.onAfter();
                                }
                            } else {
                                this.id = requestAnimationFrame(this.tick.bind(this));
                            }
                        }
                    }, {
                        key: "animate",
                        value: function animate() {
                            var _this = this;

                            this.id = requestAnimationFrame(function (timestamp) {
                                _this.startTime = timestamp;

                                _this.tick(timestamp);
                            });
                        }
                    }, {
                        key: "start",
                        value: function start() {
                            this.onBefore && this.onBefore();
                            this.begin = this.originalFrom;
                            this.finish = this.originalTo;
                            this.change = this.finish - this.begin;
                            this.id && this.stop();
                            this.animate();
                        }
                    }, {
                        key: "reverse",
                        value: function reverse() {
                            this.onBefore && this.onBefore();
                            this.begin = this.originalTo;
                            this.finish = this.originalFrom;
                            this.change = this.finish - this.begin;
                            this.id && this.stop();
                            this.animate();
                        }
                    }, {
                        key: "play",
                        value: function play() {
                            this.animate();
                        }
                    }, {
                        key: "stop",
                        value: function stop() {
                            cancelAnimationFrame(this.id);
                            this.id = null;
                            this.onStop && this.onStop();
                        }
                    }, {
                        key: "easing",
                        set: function set(easing) {
                            this.easingFunction = $JJyr$exports[easing];
                        }
                    }]);
                    return Animation;
                }();
            /**
             * @typedef {function} AnimationCallback
             * @param {number} position 現在位置
             * @param {number} time 現在時刻 (0 ~ duration)
             */


            var $mrfc$export$default = {};
            // ASSET: shaders/shooting-star.vert
            var $puli$exports = {};
            $puli$exports = `precision highp float;
            precision highp int;
            #define GLSLIFY 1
            attribute vec3 position;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            
            attribute vec4 mouse;
            attribute vec2 aFront;
            attribute float random;
            
            // uniform float uProgress;
            uniform vec2 resolution;
            uniform float pixelRatio;
            uniform float timestamp;
            
            uniform float size;
            uniform float minSize;
            // uniform float delay;
            uniform float speed;
            uniform float far;
            uniform float spread;
            uniform float maxSpread;
            uniform float maxZ;
            uniform float maxDiff;
            uniform float diffPow;
            
            varying float vProgress;
            varying float vRandom;
            varying float vDiff;
            varying float vSpreadLength;
            varying float vPositionZ;
            
            float cubicOut(float t) {
                  float f = t - 1.0;
                  return f * f * f + 1.0;
            }
            
            // #pragma glslify: cubicBezier = require(../../modules/cubicBezier.glsl)
            
            const float PI = 3.1415926;
            const float PI2 = PI * 2.;
            
            vec2 cartesianToPolar (vec2 p) {
                  return vec2((atan(p.y, p.x) + PI) / PI2, length(p));
            }
            
            vec2 polarToCartesian (vec2 p) {
                  float r = p.x * PI2 - PI;
                  float l = p.y;
                  return vec2(cos(r) * l, sin(r) * l);
            }
            
            void main () {
                  // float progress = max(uProgress - random * delay, 0.);
                  float progress = clamp((timestamp - mouse.z) * speed, 0., 1.);
                  progress *= step(0., mouse.x);
                
                  float startX = mouse.x - resolution.x / 2.;
                  float startY = mouse.y - resolution.y / 2.;
                  vec3 startPosition = vec3(startX, startY, random);
                
                  float diff = clamp(mouse.w / maxDiff, 0., 1.);
                  diff = pow(diff, diffPow);
                
                  vec3 cPosition = position * 2. - 1.;
                
                  float radian = cPosition.x * PI2 - PI;
                  vec2 xySpread = vec2(cos(radian), sin(radian)) * spread * mix(1., maxSpread, diff) * cPosition.y;
                
                  vec3 endPosition = startPosition;
                  endPosition.xy += xySpread;
                  endPosition.xy -= aFront * far * random;
                  endPosition.z += cPosition.z * maxZ * (pixelRatio > 1. ? 1.2 : 1.);
                
                  float positionProgress = cubicOut(progress * random);
                  // float positionProgress = cubicBezier(.29, .16, .3, 1., progress);
                  vec3 currentPosition = mix(startPosition, endPosition, positionProgress);
                
                  vProgress = progress;
                  vRandom = random;
                  vDiff = diff;
                  vSpreadLength = cPosition.y;
                  vPositionZ = position.z;
                
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(currentPosition, 1.);
                  gl_PointSize = max(currentPosition.z * size * diff * pixelRatio, minSize * (pixelRatio > 1. ? 1.3 : 1.));
            }
            `;
            // ASSET: shaders/shooting-star.frag
            var $v3o$exports = {};
            $v3o$exports = `precision highp float;
            precision highp int;
            #define GLSLIFY 1
            
            // uniform float uProgress;
            uniform float fadeSpeed;
            uniform float shortRangeFadeSpeed;
            uniform float minFlashingSpeed;
            uniform float blur;
            
            varying float vProgress;
            varying float vRandom;
            varying float vDiff;
            varying float vSpreadLength;
            varying float vPositionZ;
            
            highp float random(vec2 co)
            {
                    highp float a = 12.9898;
                    highp float b = 78.233;
                    highp float c = 43758.5453;
                    highp float dt= dot(co.xy ,vec2(a,b));
                    highp float sn= mod(dt,3.14);
                    return fract(sin(sn) * c);
            }
            
            float quadraticIn(float t) {
                  return t * t;
            }
            
            #ifndef HALF_PI
            #define HALF_PI 1.5707963267948966
            #endif
            
            float sineOut(float t) {
                  return sin(t * HALF_PI);
            }
            
            const vec3 baseColor = vec3(170., 133., 88.) / 255.;
            
            void main(){
                \tvec2 p = gl_PointCoord * 2. - 1.;
                \tfloat len = length(p);
                
                  float cRandom = random(vec2(vProgress * mix(minFlashingSpeed, 1., vRandom)));
                  cRandom = mix(0.3, 2., cRandom);
                
                  float cBlur = blur * mix(1., 0.3, vPositionZ);
                \tfloat shape = smoothstep(1. - cBlur, 1. + cBlur, (1. - cBlur) / len);
                  shape *= mix(0.5, 1., vRandom);
                
                  if (shape == 0.) discard;
                
                  float darkness = mix(0.1, 1., vPositionZ);
                
                  float alphaProgress = vProgress * fadeSpeed * mix(2.5, 1., pow(vDiff, 0.6));
                  alphaProgress *= mix(shortRangeFadeSpeed, 1., sineOut(vSpreadLength) * quadraticIn(vDiff));
                  float alpha = 1. - min(alphaProgress, 1.);
                  alpha *= cRandom * vDiff;
                
                \tgl_FragColor = vec4(baseColor * darkness * cRandom, shape * alpha);
            }
            `;

            function $a87C$var$_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function $a87C$var$_defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function $a87C$var$_createClass(Constructor, protoProps, staticProps) {
                if (protoProps) $a87C$var$_defineProperties(Constructor.prototype, protoProps);
                if (staticProps) $a87C$var$_defineProperties(Constructor, staticProps);
                return Constructor;
            }

            var $a87C$var$PER_MOUSE = 800;
            var $a87C$var$COUNT = $a87C$var$PER_MOUSE * 400;
            var $a87C$var$MOUSE_ATTRIBUTE_COUNT = 4;
            var $a87C$var$FRONT_ATTRIBUTE_COUNT = 2;
            var $a87C$var$data = {
                visible: {
                    value: true
                }
            };
            var $a87C$var$uniformData = {
                size: {
                    value: 0.05,
                    range: [0, 1]
                },
                minSize: {
                    value: 1.5,
                    range: [0, 5]
                },
                speed: {
                    value: 0.002,
                    range: [0, 0.05]
                },
                fadeSpeed: {
                    value: 2,
                    range: [1, 2]
                },
                shortRangeFadeSpeed: {
                    value: 1,
                    range: [1, 5]
                },
                minFlashingSpeed: {
                    value: 0.1,
                    range: [0, 1]
                },
                spread: {
                    value: 15,
                    range: [0, 20]
                },
                maxSpread: {
                    value: 20,
                    range: [1, 20]
                },
                maxZ: {
                    value: 175,
                    range: [0, 500]
                },
                blur: {
                    value: 1,
                    range: [0, 1]
                },
                far: {
                    value: 10,
                    range: [0, 100]
                },
                maxDiff: {
                    value: 100,
                    range: [0, 1000]
                },
                diffPow: {
                    value: 0.24,
                    range: [0, 10]
                }
            };
            var $a87C$var$dataKeys = Object.keys($a87C$var$uniformData);

            var $a87C$export$default =
                /*#__PURE__*/
                function () {
                    function ShootingStar() {
                        var _this = this;

                        $a87C$var$_classCallCheck(this, ShootingStar);
                        var root = $mrfc$export$default.root,
                            controller = $mrfc$export$default.controller;
                        this.root = root;
                        this.rate = 1;
                        this.setSize();
                        var folder = controller.addFolder('Shooting Star');
                        this.datData = controller.addData($a87C$var$data, {
                            folder: folder
                        });
                        var front = new THREE.Vector2();
                        var uniforms = {
                            resolution: {
                                value: $mrfc$export$default.resolution
                            },
                            pixelRatio: {
                                value: root.renderer.getPixelRatio()
                            },
                            timestamp: {
                                value: 0
                            }
                        };
                        this.datUniformData = controller.addUniformData($a87C$var$uniformData, uniforms, {
                            folder: folder
                        });
                        var geometry = this.geometry = new THREE.BufferGeometry();
                        var positions = [];
                        var mouse = [];
                        var aFront = [];
                        var random = [];

                        for (var i = 0; i < $a87C$var$COUNT; i++) {
                            positions.push(Math.random(), Math.random(), Math.random());
                            mouse.push(-1, -1, 0, 0);
                            aFront.push(front.x, front.y);
                            random.push(Math.random());
                        }

                        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
                        geometry.setAttribute('mouse', new THREE.Float32BufferAttribute(mouse, $a87C$var$MOUSE_ATTRIBUTE_COUNT));
                        geometry.setAttribute('aFront', new THREE.Float32BufferAttribute(aFront, $a87C$var$FRONT_ATTRIBUTE_COUNT));
                        geometry.setAttribute('random', new THREE.Float32BufferAttribute(random, 1));
                        var $puli$$interop$default = $parcel$interopDefault($puli$exports);
                        var $v3o$$interop$default = $parcel$interopDefault($v3o$exports);
                        var material = this.material = new THREE.RawShaderMaterial({
                            uniforms: uniforms,
                            vertexShader: $puli$$interop$default.d,
                            fragmentShader: $v3o$$interop$default.d,
                            transparent: true,
                            depthTest: false,
                            blending: THREE.AdditiveBlending
                        });
                        var mesh = this.mesh = new THREE.Points(geometry, material);
                        mesh.frustumCulled = false;
                        mesh.visible = this.datData.visible;
                        root.add(mesh); // root.initPostProcessing([
                        //   new THREE.BloomPass(1.3, 25, 3.1, 256),
                        //   new THREE.ShaderPass(THREE.CopyShader)
                        // ])

                        this.mouseI = 0;
                        this.lineCoordinateList = [];
                        this.enableSaveCoordinate = false;
                        root.addResizeCallback(function () {
                            _this.setSize();

                            material.uniforms['resolution'].value = $mrfc$export$default.resolution; // let scale
                            // if (store.ratio > store.initialRatio) {
                            //   scale = store.clientHeight / store.initialClientHeight
                            // } else {
                            //   scale = store.clientWidth / store.initialClientWidth
                            // }
                            // console.log(scale)
                            // mesh.scale.set(scale, scale, 1)
                        });
                        root.addUpdateCallback(function (timestamp) {
                            _this.update(timestamp);
                        });
                    }

                    $a87C$var$_createClass(ShootingStar, [{
                        key: "setSize",
                        value: function setSize() {
                            this.rate = Math.min($mrfc$export$default.ratio > $mrfc$export$default.initialRatio ? $mrfc$export$default.clientHeight / $mrfc$export$default.initialClientHeight : $mrfc$export$default.clientWidth / $mrfc$export$default.initialClientWidth, 1);
                            this.rate *= 1 / ($mrfc$export$default.clientHeight / $mrfc$export$default.initialClientHeight);
                        }
                    }, {
                        key: "update",
                        value: function update(timestamp) {
                            var _this2 = this;

                            this.timestamp = timestamp;
                            this.material.uniforms['timestamp'].value = timestamp;
                            this.mesh.visible = this.datData.visible;
                            $a87C$var$dataKeys.forEach(function (key) {
                                _this2.material.uniforms[key].value = _this2.datUniformData[key];
                            });
                        }
                    }, {
                        key: "draw",
                        value: function draw(_ref) {
                            var clientX = _ref.clientX,
                                clientY = _ref.clientY;
                            this.enableSaveCoordinate && this.lineCoordinateList.push({
                                clientX: clientX,
                                clientY: clientY
                            }); // const x = clientX + store.clientHalfWidth
                            // const y = store.clientHeight - (clientY + store.clientHalfHeight)

                            var x = clientX * this.rate + $mrfc$export$default.clientHalfWidth;
                            var y = $mrfc$export$default.clientHeight - (clientY * this.rate + $mrfc$export$default.clientHalfHeight);
                            var newPosition = new THREE.Vector2(x, y);
                            var diff = this.oldPosition ? newPosition.clone().sub(this.oldPosition) : new THREE.Vector2();
                            var length = diff.length();
                            var front = diff.clone().normalize();

                            for (var i = 0; i < $a87C$var$PER_MOUSE; i++) {
                                var ci = this.mouseI % ($a87C$var$COUNT * $a87C$var$MOUSE_ATTRIBUTE_COUNT) + i * $a87C$var$MOUSE_ATTRIBUTE_COUNT;
                                var position = this.oldPosition ? this.oldPosition.clone().add(diff.clone().multiplyScalar(i / $a87C$var$PER_MOUSE)) : newPosition;
                                this.geometry.attributes['mouse'].array[ci] = position.x;
                                this.geometry.attributes['mouse'].array[ci + 1] = position.y;
                                this.geometry.attributes['mouse'].array[ci + 2] = this.timestamp;
                                this.geometry.attributes['mouse'].array[ci + 3] = length;
                                this.geometry.attributes['aFront'].array[ci] = front.x;
                                this.geometry.attributes['aFront'].array[ci + 1] = front.y;
                            }

                            this.oldPosition = newPosition;
                            this.geometry.attributes['mouse'].needsUpdate = true;
                            this.geometry.attributes['aFront'].needsUpdate = true;
                            this.mouseI += $a87C$var$MOUSE_ATTRIBUTE_COUNT * $a87C$var$PER_MOUSE;
                        }
                    }, {
                        key: "start",
                        value: function start() {
                            var _this3 = this;

                            this.oldPosition = null;

                            // START HERE

                            /*
                            
                                                        function rand(a, b) {
                                                            let res = a + (b - a) * Math.random()
                            
                                                            return res.toFixed(6)
                                                        }
                            
                                                        function executeEveryFiveSeconds(callback) {
                                                            setInterval(callback, 5000);
                                                            console.log("new Coords");
                                                        }
                            
                                                        // let a = executeEveryFiveSeconds(rand(0.005, 0.0005))
                                                        // let b = executeEveryFiveSeconds(rand(0.001, 0.0001))
                            
                                                        // gsap.to(pc.config, {
                                                        //     sleepTimeCoefX: rand(0, $mrfc$export$default.clientHalfWidth),
                                                        //     duration: 4,
                                                        //     ease: "none"
                                                        // })
                            
                                                        // gsap.to(pc.config, {
                                                        //     sleepTimeCoefY: rand(0, $mrfc$export$default.clientHalfHeight),
                                                        //     duration: 4,
                                                        //     ease: "none"
                                                        // })
                                                        myCoords = { myX: 0, myY: 0 }
                            
                                                        executeEveryFiveSeconds(() => {
                            
                            
                                                            // let myCoords = { myX: 0, myY: 0 }
                                                            // gsap.to(myCoords, {
                                                            //     myX: rand(0, $mrfc$export$default.clientHalfWidth),
                                                            //     duration: 4.99,
                                                            //     ease: "none"
                                                            // })
                            
                                                            gsap.to(myCoords, {
                                                                myY: rand(0, $mrfc$export$default.clientHalfHeight),
                                                                myX: rand(0, $mrfc$export$default.clientHalfWidth),
                                                                duration: 4.99,
                                                                ease: "none",
                                                                onUpdate: function () {
                                                                    let xx = myCoords.myX
                                                                    let yy = myCoords.myY
                                                                    console.log(xx, yy);
                            
                            
                                                                    this.shootingStar.draw({ xx, yy })
                                                                }
                            
                                                            })
                            
                                                            console.log(myCoords.myX, myCoords.myY);
                            
                                                            _this3.draw(myCoords.myX, myCoords.myY)
                            
                                                        })
                            */

                            // window.addEventListener('pointermove', function (e) {
                            //     var clientX = e.clientX,
                            //         clientY = e.clientY;

                            //     _this3.draw({
                            //         clientX: clientX - $mrfc$export$default.clientHalfWidth,
                            //         clientY: clientY - $mrfc$export$default.clientHalfHeight
                            //     });
                            //     console.log({ clientX, clientY });
                            // });
                            window.addEventListener('touchmove', function (e) {
                                var _e$touches$ = e.touches[0],
                                    clientX = _e$touches$.clientX,
                                    clientY = _e$touches$.clientY;

                                _this3.draw({
                                    clientX: clientX - $mrfc$export$default.clientHalfWidth,
                                    clientY: clientY - $mrfc$export$default.clientHalfHeight
                                });
                            });
                        }
                    }]);
                    return ShootingStar;
                }();

            function $vFOr$export$getTextCoordinate(option) {
                var text = option.text,
                    fontSize = option.fontSize,
                    _option$letterSpacing = option.letterSpacing,
                    letterSpacing = _option$letterSpacing === void 0 ? 0 : _option$letterSpacing,
                    _option$font = option.font,
                    font = _option$font === void 0 ? 'Open sans' : _option$font,
                    _option$color = option.color,
                    color = _option$color === void 0 ? '#000000' : _option$color,
                    _option$width = option.width,
                    width = _option$width === void 0 ? fontSize * text.length + fontSize * letterSpacing * (text.length - 1) : _option$width,
                    _option$height = option.height,
                    height = _option$height === void 0 ? fontSize : _option$height,
                    _option$pixelRatio = option.pixelRatio,
                    pixelRatio = _option$pixelRatio === void 0 ? window.devicePixelRatio : _option$pixelRatio;
                fontSize *= pixelRatio;
                width *= pixelRatio;
                height *= pixelRatio;
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.style.fontSize = fontSize + 'px';
                canvas.style.letterSpacing = letterSpacing + 'em';
                canvas.style.display = 'none';
                document.body.appendChild(canvas); // letter-spacing を有効にするために必要

                var ctx = canvas.getContext('2d');
                ctx.font = "".concat(fontSize, "px ").concat(font);
                ctx.fillStyle = color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                var textLines = text.split(' ');
                textLines.forEach(function (text, i) {
                    var x = width / 2;
                    var y = height / 2 + fontSize * i - fontSize / 2 * (textLines.length - 1);
                    ctx.fillText(text, x, y);
                });
                return canvas;
            }

            // ASSET: shaders/general/three-raw-plain.vert
            var $eAJ8$exports = {};
            $eAJ8$exports = `precision highp float;
            precision highp int;
            #define GLSLIFY 1
            attribute vec3 position;
            attribute vec2 uv;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            }
            `;
            // ASSET: shaders/text.frag
            var $UNYd$exports = {};
            $UNYd$exports = `precision highp float;
            precision highp int;
            #define GLSLIFY 1
            
            uniform sampler2D map;
            uniform float uProgress;
            uniform float uStartX;
            uniform float uRatio;
            uniform float alpha;
            
            varying vec2 vUv;

            void main(){
                \tvec4 textureColor = texture2D(map, vUv);
                \tfloat angle = uRatio / 3.;
                \tfloat isShow = step(1., 1. - vUv.x + (uProgress / uStartX * 0.5 + 0.5) - abs(vUv.y - 0.5) / angle);
                \tgl_FragColor = vec4(textureColor.rgb, textureColor.a * alpha * isShow);
                \t// gl_FragColor = vec4(isShow);
            }
            `;

            function $m6Ky$var$_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function $m6Ky$var$_defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function $m6Ky$var$_createClass(Constructor, protoProps, staticProps) {
                if (protoProps) $m6Ky$var$_defineProperties(Constructor.prototype, protoProps);
                if (staticProps) $m6Ky$var$_defineProperties(Constructor, staticProps);
                return Constructor;
            }

            var $m6Ky$var$TEXT = 'Shooting Star';
            var $m6Ky$var$FONT_SIZE = 30;
            var $m6Ky$var$FONT_SIZE_SP = 24;
            var $m6Ky$var$FONT_SIZE_MIN = 20;
            var $m6Ky$var$LETTER_SPACING = 0.18;
            var $m6Ky$var$LETTER_SPACING_SP = 0.1;
            var $m6Ky$var$FONT = 'Georgia, serif';
            var $m6Ky$var$COLOR = '#fff';
            var $m6Ky$var$data = {
                visible: {
                    value: true
                },
                duration: {
                    value: 1080,
                    range: [0, 5000]
                },
                easing: {
                    value: 'easeOutQuint',
                    range: [$JJyr$export$easingList]
                }
            };
            var $m6Ky$var$uniformData = {
                alpha: {
                    value: 0.8,
                    range: [0, 1]
                }
            };
            var $m6Ky$var$dataKeys = Object.keys($m6Ky$var$uniformData);

            var $m6Ky$export$default =
                /*#__PURE__*/
                function () {
                    function Text() {
                        var _this = this;

                        $m6Ky$var$_classCallCheck(this, Text);
                        var root = $mrfc$export$default.root,
                            controller = $mrfc$export$default.controller;
                        var folder = this.folder = controller.addFolder('Text');
                        this.datData = controller.addData($m6Ky$var$data, {
                            folder: folder
                        });
                        var fontSize = $mrfc$export$default.clientWidth < 360 ? $m6Ky$var$FONT_SIZE_MIN : $mrfc$export$default.clientWidth < 768 ? $m6Ky$var$FONT_SIZE_SP : $m6Ky$var$FONT_SIZE;
                        var letterSpacing = $mrfc$export$default.clientWidth < 768 ? $m6Ky$var$LETTER_SPACING_SP : $m6Ky$var$LETTER_SPACING;
                        var textNormalWidth = $m6Ky$var$TEXT.length + letterSpacing * ($m6Ky$var$TEXT.length - 1);
                        var textWidth = fontSize * textNormalWidth;
                        var textHeight = fontSize * 1.2;
                        var pixelRatio = window.devicePixelRatio;
                        var textCanvas = $vFOr$export$getTextCoordinate({
                            text: $m6Ky$var$TEXT,
                            fontSize: fontSize,
                            height: textHeight,
                            letterSpacing: letterSpacing,
                            font: $m6Ky$var$FONT,
                            color: $m6Ky$var$COLOR,
                            pixelRatio: pixelRatio
                        });
                        var width = textCanvas.width / pixelRatio;
                        var height = textCanvas.height / pixelRatio;
                        var halfWidth = width / 2;
                        var texture = new THREE.Texture(textCanvas);
                        texture.needsUpdate = true;
                        texture.minFilter = THREE.LinearFilter;
                        var geometry = new THREE.BufferGeometry(width, height);
                        var uniforms = {
                            map: {
                                value: texture
                            },
                            uProgress: {
                                value: -$mrfc$export$default.clientHalfWidth
                            },
                            uStartX: {
                                value: $mrfc$export$default.clientHalfWidth - halfWidth
                            },
                            uRatio: {
                                value: width / height
                            }
                        };
                        this.datUniformData = controller.addUniformData($m6Ky$var$uniformData, uniforms, {
                            folder: folder
                        });
                        var $eAJ8$$interop$default = $parcel$interopDefault($eAJ8$exports);
                        var $UNYd$$interop$default = $parcel$interopDefault($UNYd$exports);
                        var material = this.material = new THREE.RawShaderMaterial({
                            uniforms: uniforms,
                            vertexShader: $eAJ8$$interop$default.d,
                            fragmentShader: $UNYd$$interop$default.d,
                            transparent: true
                        });
                        var mesh = this.mesh = new THREE.Mesh(geometry, material);
                        mesh.frustumCulled = false;
                        mesh.visible = this.datData.visible;
                        mesh.position.setZ(0.1);
                        root.add(mesh);
                        root.addUpdateCallback(function (timestamp) {
                            _this.mesh.visible = _this.datData.visible;
                            $m6Ky$var$dataKeys.forEach(function (key) {
                                _this.material.uniforms[key].value = _this.datUniformData[key];
                            });
                        });
                    }

                    $m6Ky$var$_createClass(Text, [{
                        key: "update",
                        value: function update(progress) {
                            this.material.uniforms['uProgress'].value = progress;
                        }
                    }]);
                    return Text;
                }();

            function $Focm$var$_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function $Focm$var$_defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function $Focm$var$_createClass(Constructor, protoProps, staticProps) {
                if (protoProps) $Focm$var$_defineProperties(Constructor.prototype, protoProps);
                if (staticProps) $Focm$var$_defineProperties(Constructor, staticProps);
                return Constructor;
            }

            var $Focm$var$CAMERA_Z = 5000;
            var $Focm$var$MAX_CAMERA_Z = 5000;
            var $Focm$var$FIRST_DURATION = 1080;
            var $Focm$var$DELAY = 300;
            var $Focm$var$data = {
                play: {
                    value: null
                }
            };

            var $Focm$var$WebGL =
                /*#__PURE__*/
                function () {
                    function WebGL(_ref) {
                        var _this = this;

                        var canvas = _ref.canvas,
                            _ref$container = _ref.container,
                            container = _ref$container === void 0 ? document.body : _ref$container;
                        $Focm$var$_classCallCheck(this, WebGL);
                        var controller = new $IDtB$export$default({
                            closed: true
                        });
                        $mrfc$export$default.controller = controller;
                        var initialClientWidth = $mrfc$export$default.initialClientWidth = container.clientWidth;
                        var initialClientHeight = $mrfc$export$default.initialClientHeight = container.clientHeight; // store.initialRatio = container.clientWidth / container.clientHeight

                        $mrfc$export$default.initialRatio = 1;
                        var root = this.root = $mrfc$export$default.root = new $pTw7$export$default({
                            isDev: true,
                            container: container,
                            fov: Math.atan(initialClientHeight / 2 / $Focm$var$CAMERA_Z) * (180 / Math.PI) * 2,
                            zFar: $Focm$var$MAX_CAMERA_Z,
                            cameraPosition: [0, 0, $Focm$var$CAMERA_Z],
                            aspect: window.innerWidth / window.innerHeight,
                            canvas: canvas
                        });
                        this.setSize();
                        root.addResizeCallback(function () {
                            _this.setSize();
                        }); // this.background = new Background()

                        this.text = new $m6Ky$export$default();
                        this.shootingStar = new $a87C$export$default();

                        $Focm$var$data['play'].value = function () {
                            _this.textStart();
                        };

                        controller.addData($Focm$var$data, {
                            folder: this.text.folder
                        }); // root.initPostProcessing([
                        //   new THREE.BloomPass(),
                        //   new THREE.ShaderPass(THREE.CopyShader)
                        // ])
                    }

                    $Focm$var$_createClass(WebGL, [{
                        key: "setSize",
                        value: function setSize() {
                            var clientWidth = $mrfc$export$default.clientWidth = this.root.canvas.clientWidth;
                            var clientHeight = $mrfc$export$default.clientHeight = this.root.canvas.clientHeight;
                            $mrfc$export$default.clientHalfWidth = clientWidth / 2;
                            $mrfc$export$default.clientHalfHeight = clientHeight / 2;
                            $mrfc$export$default.resolution = new THREE.Vector2(clientWidth, clientHeight);
                            $mrfc$export$default.ratio = clientWidth / clientHeight;
                        }
                    }, {
                        key: "start",
                        value: function start() {
                                var clientWidth = $mrfc$export$default.clientWidth = this.root.canvas.clientWidth;
                            var clientHeight = $mrfc$export$default.clientHeight = this.root.canvas.clientHeight;
                            var _this2 = this;
                            let myCoords = { myX: (clientWidth / 2) - ((clientWidth / 2) * Math.random()), myY: clientHeight / 2 }

                            function rand(a, b) {
                                let res = a + (b - a) * Math.random()

                                return res.toFixed(6)
                            }

                            function executeEverySeconds(callback) {
                                setInterval(callback, 4500);
                            }
                            var period = Math.PI * 3;
                            var amplitude = Math.min(Math.max($mrfc$export$default.clientWidth * 0.1, 100), 180);
                            $Zk$export$animate(function (progress) {
                                _this2.shootingStar.draw({
                                    clientX: Math.cos(progress * period) * amplitude,
                                    clientY: (progress * $mrfc$export$default.clientHeight - $mrfc$export$default.clientHalfHeight) * 1.3
                                });
                            }, {
                                duration: $Focm$var$FIRST_DURATION,
                                onAfter: function onAfter() {
                                    /*
                                    _this2.shootingStar.draw({
                                        clientX: -$mrfc$export$default.clientHalfWidth,
                                        clientY: $mrfc$export$default.clientHeight - $mrfc$export$default.clientHalfHeight
                                    });

                                    _this2.shootingStar.draw({
                                        clientX: -$mrfc$export$default.clientHalfWidth * 1.1,
                                        clientY: 0
                                    });
                                    */

                                    // START HERE
                                    // SLIM SLIM 
                                    let latest = {
                                        x: 0,
                                        y: 0
                                    }
                                    let ex = 0, ey = 0
                                    let multi = 1
                                    let randY = $mrfc$export$default.clientHalfHeight

                                    let hw = $mrfc$export$default.clientHalfWidth
                                    let hh = $mrfc$export$default.clientHalfHeight

                                        let visibleTab = true
                            document.addEventListener('visibilitychange', (event) => {
                                if (document.hidden) {
                                    console.log('not visible');
                                    visibleTab = false
                                    // this.renderer.setAnimationLoop(null);
                                } else {
                                    console.log('is visible');

                                    visibleTab = true
                                    // this.renderer.setAnimationLoop(this.renderer.bind(this));

                                }
                            });
                                        
                                    executeEverySeconds(() => {
                                            if (document.hidden || !visibleTab) {
                                    console.log("hidden ... ");

                                }
                                else {
                                    
                                
                                        gsap.to(myCoords, {
                                            // myY: rand(-$mrfc$export$default.clientHalfHeight, $mrfc$export$default.clientHalfHeight),
                                            // myX: rand(-$mrfc$export$default.clientHalfWidth, $mrfc$export$default.clientHalfWidth),

                                            myX: () => {
                                                    if (visibleTab) {
                                                let ran = rand(1, 11)
                                                if (ran < 5) {
                                                    return -hw + (hw / ran)
                                                    console.log('myX : ', myCoords.myX, 'latest X ', latest.x);

                                                } else {
                                                    return hw + (-hw / ran)
                                                    console.log('myX : ', myCoords.myX, 'latest X ', latest.x);

                                                }
                                            }

                                            },
                                            myY: () => {
                                            if (visibleTab) {
                                                return latest.y > 0 ? -hh : hh
                                            }
                                        },  
                                                
                                            duration: 3.5,
                                            ease: "Power4.easeOut",
                                            onStart: async () => {

                                               latest.x = myCoords.myX

                                                if (latest.y != myCoords.myY) {
                                                    latest.y = myCoords.myY
                                                } else {
                                                    myCoords.myY = -myCoords.myY
                                                    latest.y = myCoords.myY

                                                }


                                            },
                                            onUpdate: function () {

                                                if (visibleTab) {
                                                        
                                                let xx = myCoords.myX
                                                let yy = (Math.sin(myCoords.myX * 0.009) * 100) + myCoords.myY * 2
                                                _this2.shootingStar.draw({ clientX: xx, clientY: yy })
                                                }
                                                
                                            }
                                        })
                                            }
                                                    
                                    })

                                    // END SLIM



                                    // let a = executeEveryFiveSeconds(rand(0.005, 0.0005))
                                    // let b = executeEveryFiveSeconds(rand(0.001, 0.0001))

                                    // gsap.to(pc.config, {
                                    //     sleepTimeCoefX: rand(0, $mrfc$export$default.clientHalfWidth),
                                    //     duration: 4,
                                    //     ease: "none"
                                    // })

                                    // gsap.to(pc.config, {
                                    //     sleepTimeCoefY: rand(0, $mrfc$export$default.clientHalfHeight),
                                    //     duration: 4,
                                    //     ease: "none"
                                    // })



                                    // let myCoords = { myX: 0, myY: 0 }
                                    // gsap.to(myCoords, {
                                    //     myX: rand(0, $mrfc$export$default.clientHalfWidth),
                                    //     duration: 4.99,
                                    //     ease: "none"
                                    // })



                                    // setTimeout(function () {
                                    //     _this2.textStart();
                                    // }, 300);
                                }
                            });
                        }
                    }, {
                        key: "textStart",
                        value: function textStart() {
                            var _this3 = this;

                            $Zk$export$animate(function (progress) {
                                _this3.shootingStar.draw({
                                    clientX: progress,
                                    clientY: 0
                                });

                                _this3.text.update(progress - $mrfc$export$default.clientWidth * 0.08);
                            }, {
                                begin: -$mrfc$export$default.clientHalfWidth * 1.1,
                                finish: $mrfc$export$default.clientHalfWidth * 1.1,
                                duration: this.text.datData.duration,
                                easing: this.text.datData.easing,
                                onAfter: function onAfter() {
                                    _this3.shootingStar.start();

                                    document.body.classList.add('o-start');
                                }
                            });
                        }
                    }]);
                    return WebGL;
                }();

            var $Focm$var$webGL = new $Focm$var$WebGL({
                canvas: document.getElementById('canvas-glitter')
            });
            setTimeout(function () {
                $Focm$var$webGL.start();
            }, $Focm$var$DELAY);
            return {
                "Focm": {}
            };
        });
