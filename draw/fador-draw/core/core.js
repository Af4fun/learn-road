var _excluded = ["canvas", "context"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { arrayMoveImmutable } from "../utils";
import EventCenter from "../utils/event";
import Point from "./point";
var Core = /*#__PURE__*/function () {
  function Core(el) {
    _classCallCheck(this, Core);
    _defineProperty(this, "layers", []);
    /** 被选中激活的图层 */
    _defineProperty(this, "selectedLayers", []);
    /**正在绘制的元素 */
    _defineProperty(this, "activedLayer", void 0);
    _defineProperty(this, "layout", void 0);
    _defineProperty(this, "animationFrame", void 0);
    _defineProperty(this, "isDrag", false);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "context", void 0);
    _defineProperty(this, "eventCenter", new EventCenter());
    if (!el) throw new Error('need a div target');
    var _this$creatElement = this.creatElement(el),
      canvas = _this$creatElement.canvas,
      context = _this$creatElement.context,
      rest = _objectWithoutProperties(_this$creatElement, _excluded);
    this.canvas = canvas;
    this.context = context;
    this.layout = rest;
    this.bindEvents();
    this.render();
  }
  _createClass(Core, [{
    key: "scale",
    get: function get() {
      var zoom = this.layout.zoom;
      if (zoom > 0) {
        return zoom + 1;
      } else if (zoom < 0) {
        return 1 / (-zoom + 1);
      }
      return 1;
    }
  }, {
    key: "creatElement",
    value: function creatElement(el) {
      var target = document.createElement('canvas');
      var dpr = window.devicePixelRatio || 1;
      var _style = window.getComputedStyle(el);
      var width = parseFloat(_style.width);
      var height = parseFloat(_style.height);
      target.width = width * dpr;
      target.height = height * dpr;
      target.style.width = width + 'px';
      target.style.height = height + 'px';
      target.style.cursor = 'grab';
      target.style.userSelect = 'none';
      var context = target.getContext('2d');
      context.scale(dpr, dpr);
      context.translate(width / 2, height / 2);
      el.appendChild(target);
      return {
        dpr: dpr,
        zoom: 0,
        width: width,
        height: height,
        origin: new Point(0, 0),
        offset: new Point(0, 0),
        canvas: target,
        context: context
      };
    }
  }, {
    key: "addlayer",
    value: function addlayer(layers) {
      if (Array.isArray(layers)) {
        this.layers = this.layers.concat(layers);
      } else {
        this.layers.push(layers);
      }
      return this.layers;
    }
  }, {
    key: "deleteLayer",
    value: function deleteLayer(layer) {
      var _this = this;
      for (var i = 0; i < this.layers.length; i++) {
        if (Array.isArray(layer)) {
          var _iterator = _createForOfIteratorHelper(layer),
            _step;
          try {
            var _loop = function _loop() {
              var l = _step.value;
              if (l === _this.layers[i]) {
                _this.layers.splice(i, 1);
                var idx = _this.selectedLayers.findIndex(function (acl) {
                  return acl == l;
                });
                if (idx > -1) {
                  _this.selectedLayers.splice(idx, 1);
                }
              }
            };
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          if (layer === this.layers[i]) {
            this.layers.splice(i, 1);
            var idx = this.selectedLayers.findIndex(function (l) {
              return l == layer;
            });
            if (idx > -1) {
              this.selectedLayers.splice(idx, 1);
            }
          }
        }
      }
      return this.layers;
    }
  }, {
    key: "selectLayerByUuid",
    value: function selectLayerByUuid(uuid) {
      for (var i = 0; i < this.layers.length; i += 1) {
        if (this.layers[i].uuid == uuid) {
          return this.layers[i];
        }
      }
      return undefined;
    }

    // 拖拽变更 数组元素位置
  }, {
    key: "layerMove",
    value: function layerMove(oldIndex, newIndex) {
      this.layers = arrayMoveImmutable(this.layers, oldIndex, newIndex);
      this.eventCenter.emit('layerChange', this.layers);
    }

    // 触发观察者
  }, {
    key: "notifyAllObservers",
    value: function notifyAllObservers(action) {
      for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arg[_key - 1] = arguments[_key];
      }
      this.layers.forEach(function (layer) {
        var _layer$update;
        return (_layer$update = layer.update).call.apply(_layer$update, [layer, action].concat(arg));
      });
    }
  }, {
    key: "paint",
    value: function paint() {
      var _this$activedLayer;
      var _this$layout = this.layout,
        width = _this$layout.width,
        height = _this$layout.height,
        offset = _this$layout.offset;
      var context = this.context;
      if (!context) return;
      context.clearRect(-width / 2, -height / 2, width * 2, height * 2);
      context.save();
      var _offset$getTruePositi = offset.getTruePosition(this.scale),
        _offset$getTruePositi2 = _slicedToArray(_offset$getTruePositi, 2),
        x = _offset$getTruePositi2[0],
        y = _offset$getTruePositi2[1];
      /** 把原点移动到画布的中心 */
      context.translate(x, y);
      for (var i = 0; i < this.layers.length; i += 1) {
        this.layers[i].render(context, this.scale);
      }
      (_this$activedLayer = this.activedLayer) === null || _this$activedLayer === void 0 || _this$activedLayer.render(context, this.scale);
      context.restore();
    }
  }, {
    key: "resize",
    value: function resize() {
      var el = this.canvas.parentElement;
      var _style = window.getComputedStyle(el);
      var w = parseFloat(_style.width);
      var h = parseFloat(_style.height);
      this.canvas.width = w * this.layout.dpr;
      this.canvas.height = h * this.layout.dpr;
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
      this.layout.width = w;
      this.layout.height = h;
      this.context.scale(this.layout.dpr, this.layout.dpr);
      this.context.translate(this.layout.width / 2, this.layout.height / 2);
    }
  }, {
    key: "render",
    value: function render() {
      this.animationFrame = requestAnimationFrame(this.render.bind(this));
      this.paint();
    }

    // 销毁实例
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    }

    /**
     * 捕获触发位置的layer
     * layers 是一个队列 若layer 有重叠 那么应该取索引比较大的那一个
     * @param x
     * @param y
     * @returns
     */
  }, {
    key: "getLayerByPosition",
    value: function getLayerByPosition(p) {
      var queue = _toConsumableArray(this.layers);
      while (queue.length) {
        var topLayer = queue.pop();
        if (!topLayer) return;
        if (topLayer.isInPath(p)) return topLayer;
        continue;
      }
    }

    /**
     * 获取鼠标位于坐标轴上的位置
     * @param e
     * @returns
     */
  }, {
    key: "getPosition",
    value: function getPosition(_ref) {
      var offsetX = _ref.offsetX,
        offsetY = _ref.offsetY;
      var _this$layout2 = this.layout,
        origin = _this$layout2.origin,
        width = _this$layout2.width,
        height = _this$layout2.height;
      // 真实像素
      var tx = offsetX - width / 2;
      var ty = offsetY - height / 2;
      // 映射到坐标轴上的坐标
      var lx = tx * this.scale;
      var ly = ty * this.scale;
      return new Point(lx - origin.x, ly - origin.y);
    }
  }, {
    key: "onWheel",
    value: function onWheel(e) {
      e.preventDefault();
      if (e.deltaY < 0) {
        this.layout.zoom = Math.min(3, this.layout.zoom + 1);
      } else {
        this.layout.zoom = Math.max(-3, this.layout.zoom - 1);
      }
    }
    // 绑定编辑事件
  }, {
    key: "bindEditEvent",
    value: function bindEditEvent(layer) {
      var _this2 = this;
      var canvas = this.canvas;
      canvas.onmouseup = function (e) {
        e.preventDefault();
        layer.update('onmouseup', _this2.getPosition(e));
        canvas.onmousemove = function (e) {
          return _this2.onHover.call(_this2, e);
        };
        // 移除事件
        canvas.onmouseup = null;
      };
      canvas.onmouseleave = function (e) {
        e.preventDefault();
        layer.update('onmouseup', _this2.getPosition(e));
        canvas.onmousemove = function (e) {
          return _this2.onHover.call(_this2, e);
        };
        // 移除事件
        canvas.onmouseup = null;
        canvas.onmouseleave = null;
      };
      canvas.onmousemove = function (e) {
        e.preventDefault();
        layer.update('onmousemove', _this2.getPosition(e));
      };
    }
    // 绑定拖拽事件
  }, {
    key: "bindDragEvent",
    value: function bindDragEvent(position, layer) {
      var _this3 = this;
      var canvas = this.canvas;
      var origin = this.layout.origin;
      this.isDrag = false;
      canvas.onmousemove = function (e) {
        e.preventDefault();
        _this3.isDrag = true;
        canvas.style.cursor = 'grabbing';
        var end = _this3.getPosition(e);
        var x = end.x - position.x;
        var y = end.y - position.y;
        if (_this3.selectedLayers.length > 0) {
          _this3.selectedLayers.forEach(function (actived) {
            var _actived$origin$toArr = actived.origin.toArray(),
              _actived$origin$toArr2 = _slicedToArray(_actived$origin$toArr, 2),
              ox = _actived$origin$toArr2[0],
              oy = _actived$origin$toArr2[1];
            // actived.offset.update(ox + x, oy + y);
          });
        } else {
          var _origin$toArray = origin.toArray(),
            _origin$toArray2 = _slicedToArray(_origin$toArray, 2),
            ox = _origin$toArray2[0],
            oy = _origin$toArray2[1];
          // 重置偏移量
          _this3.layout.offset.update(ox + x, oy + y);
        }
        canvas.onmouseleave = function (e) {
          e.preventDefault();
          handleUpdate.call(_this3, e);
          canvas.onmousemove = function (e) {
            return _this3.onHover.call(_this3, e);
          };
          // 移除事件
          canvas.onmouseup = null;
          canvas.onmouseleave = null;
          _this3.isDrag = false;
        };
      };
      var handleUpdate = function handleUpdate(e) {
        var end = _this3.getPosition(e);
        var x = end.x - position.x;
        var y = end.y - position.y;
        if (_this3.selectedLayers.length > 0) {
          _this3.selectedLayers.forEach(function (actived) {
            var _actived$origin$toArr3 = actived.origin.toArray(),
              _actived$origin$toArr4 = _slicedToArray(_actived$origin$toArr3, 2),
              ox = _actived$origin$toArr4[0],
              oy = _actived$origin$toArr4[1];
            actived.origin.update(ox + x, oy + y);
          });
        } else {
          // 修正原点
          var _origin$toArray3 = origin.toArray(),
            _origin$toArray4 = _slicedToArray(_origin$toArray3, 2),
            ox = _origin$toArray4[0],
            oy = _origin$toArray4[1];
          _this3.layout.origin.update(ox + x, oy + y);
        }
        canvas.style.cursor = 'grab';
      };
      canvas.onmouseup = function (e) {
        e.preventDefault();
        if (!_this3.isDrag) {
          layer && layer.update('emit', 'onclick', e);
        } else {
          handleUpdate.call(_this3, e);
        }
        canvas.onmousemove = function (e) {
          return _this3.onHover.call(_this3, e);
        };
        //  移除事件
        canvas.onmouseup = null;
        canvas.onmouseleave = null;
        _this3.isDrag = false;
      };
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      e.preventDefault();
      var button = e.button;
      /** 区分左右键 */
      if (button !== 0) return;
      var position = this.getPosition(e);
      var layer = this.getLayerByPosition(position);
      // 捕获到编辑中的图层 对canvas 执行事件监听
      if (layer && layer.isEdit) {
        // 对canvas 事件覆盖监听
        layer.update('onmousedown', position);
        this.bindEditEvent(layer);
      } else {
        // 否则执行图层移动方法
        this.bindDragEvent(position, layer);
      }
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(e) {
      e.preventDefault();
      this.isDrag = false;
    }
  }, {
    key: "onHover",
    value: function onHover(e) {
      var _this4 = this;
      e.preventDefault();
      var canvas = this.canvas;
      var position = this.getPosition(e);
      var layer = this.getLayerByPosition(position);
      if (layer) {
        if (!layer.isMouseIn && !layer.isEdit) {
          this.eventCenter.emit('mouseenter', layer);
          layer.isMouseIn = true;
          layer.update('onhover');
        }
        canvas.style.cursor = 'inherit';
      } else {
        canvas.style.cursor = 'grab';
      }
      this.layers.forEach(function (x) {
        if (x != layer && x.isMouseIn) {
          _this4.eventCenter.emit('mouseleave', layer);
          x.isMouseIn = false;
        }
      });
    }

    // 响应事件
  }, {
    key: "on",
    value: function on(name, fc) {
      this.eventCenter.on(name, fc);
    }
  }, {
    key: "onContextMenu",
    value: function onContextMenu(e) {
      e.preventDefault();
    }

    // 绑定初始事件
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this5 = this;
      var canvas = this.canvas;
      /** 绑定滚轮事件 */
      canvas.onwheel = function (e) {
        return _this5.onWheel.call(_this5, e);
      };
      canvas.onmousedown = function (e) {
        return _this5.onMouseDown.call(_this5, e);
      };
      canvas.onmouseleave = function (e) {
        return _this5.onMouseLeave.call(_this5, e);
      };
      canvas.oncontextmenu = function (e) {
        return _this5.onContextMenu.call(_this5, e);
      };
      canvas.onmousemove = function (e) {
        return _this5.onHover.call(_this5, e);
      };
    }
    // 移除事件
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      var canvas = this.canvas;
      // canvas.onwheel = null;
      canvas.onmousedown = null;
      canvas.onmouseleave = null;
      canvas.oncontextmenu = null;
      canvas.onmousemove = null;
    }
  }, {
    key: "afterPaint",
    value: function afterPaint() {
      var _this$activedLayer2;
      this.removeEvents();
      this.canvas.style.cursor = 'grab';
      (_this$activedLayer2 = this.activedLayer) === null || _this$activedLayer2 === void 0 || _this$activedLayer2.reset();
      this.bindEvents();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.afterPaint();
      this.layout.offset.update(0, 0);
      this.layout.origin.update(0, 0);
      this.layout.zoom = 0;
      // this.notifyAllObservers("onScale", this.layout.zoom);
    }
  }]);
  return Core;
}();
export { Core as default };