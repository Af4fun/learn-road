function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import Core from "./core/core";
import MenuPop from "./core/menu_pop";
import { arrayMoveImmutable } from "./utils";
import Circular from "./widgets/circular";
import CircularActiveLayer from "./widgets/circular/active";
import Geometry from "./widgets/geometry";
import { GeometryActiveLayer } from "./widgets/geometry/active";
import Line from "./widgets/line";
import LineActiveLayer from "./widgets/line/active";
import { Mark } from "./widgets/mark";
import Rect from "./widgets/rect";
import RectActiveLayer from "./widgets/rect/active";
var Draw = /*#__PURE__*/function (_Core) {
  _inherits(Draw, _Core);
  var _super = _createSuper(Draw);
  function Draw(el) {
    var _this;
    _classCallCheck(this, Draw);
    _this = _super.call(this, el);
    _defineProperty(_assertThisInitialized(_this), "menu", void 0);
    _defineProperty(_assertThisInitialized(_this), "activedLayerIndex", -1);
    _this.menu = new MenuPop();
    el === null || el === void 0 || el.appendChild(_this.menu.el);
    return _this;
  }
  _createClass(Draw, [{
    key: "onContextMenu",
    value: function onContextMenu(e) {
      _get(_getPrototypeOf(Draw.prototype), "onContextMenu", this).call(this, e);
      var position = this.getPosition(e);
      var layer = this.getLayerByPosition(position);
      var last = this.layers.length - 1;
      var self = this;
      if (layer) {
        this.menu.open(e.offsetX, e.offsetY, layer.isEdit ? {
          onSave: function onSave() {
            layer.saveEdit();
            self.layers = arrayMoveImmutable(self.layers, last, self.activedLayerIndex);
          },
          onCancel: function onCancel() {
            layer.cancelEdit();
            self.layers = arrayMoveImmutable(self.layers, last, self.activedLayerIndex);
          }
        } : {
          onEdit: function onEdit() {
            // 此时需要将layer至于图层的顶层
            self.activedLayerIndex = self.layers.findIndex(function (l) {
              return l.uuid === layer.uuid;
            });
            self.layers = arrayMoveImmutable(self.layers, self.activedLayerIndex, last);
            layer.startEdit.call(layer);
          },
          onDelete: function onDelete() {
            self.deleteLayer(layer);
            self.activedLayerIndex = -1;
          }
        });
      } else {
        this.menu.close();
      }
    }
  }, {
    key: "bindDragEvent",
    value: function bindDragEvent(position, layer) {
      _get(_getPrototypeOf(Draw.prototype), "bindDragEvent", this).call(this, position, layer);
      if (this.menu.isOpen) {
        this.menu.close();
      }
    }
  }, {
    key: "line",
    value: function line(config) {
      var _this2 = this;
      this.removeEvents();
      this.canvas.style.cursor = 'crosshair';
      var line_active = new LineActiveLayer(config === null || config === void 0 ? void 0 : config.activeStyle);
      this.activedLayer = line_active;
      // 绑定绘制事件
      this.canvas.onmousedown = function (e) {
        if (e.button !== 0) return;
        var _this2$getPosition = _this2.getPosition(e),
          x = _this2$getPosition.x,
          y = _this2$getPosition.y;
        line_active.setStart(x, y);
        _this2.canvas.onmousemove = function (e) {
          var activedPosition = _this2.getPosition(e);
          line_active.setActived(activedPosition.x, activedPosition.y);
        };
      };
      this.canvas.onmouseup = function (e) {
        _this2.canvas.onmousemove = null;
        var end = _this2.getPosition(e);
        if (line_active.start) {
          /** 绘制线段长度 */
          var line_long = Math.sqrt(Math.pow(end.y - line_active.start.y, 2) + Math.pow(end.x - line_active.start.x, 2));
          if (line_long > 5) {
            var _config$onSuccess;
            var line = new Line({
              start: line_active.start,
              end: end,
              style: config === null || config === void 0 ? void 0 : config.lineStyle
            });
            _this2.addlayer(line);
            config === null || config === void 0 || (_config$onSuccess = config.onSuccess) === null || _config$onSuccess === void 0 || _config$onSuccess.call(config, line);
          } else {
            line_active.reset();
          }
        }
        _this2.afterPaint();
      };
      this.canvas.onmouseleave = function () {
        _this2.canvas.onmousemove = null;
        _this2.afterPaint();
      };
    }
  }, {
    key: "mark",
    value: function mark(config) {
      var _this3 = this;
      this.removeEvents();
      this.canvas.style.cursor = 'crosshair';
      this.canvas.onmousedown = function (e) {
        var _config$onSuccess2;
        if (e.button !== 0) return;
        var start = _this3.getPosition(e);
        var layer = new Mark(start, {
          src: config === null || config === void 0 ? void 0 : config.src,
          color: config === null || config === void 0 ? void 0 : config.color,
          size: config === null || config === void 0 ? void 0 : config.size
        });
        _this3.addlayer(layer);
        _this3.afterPaint();
        config === null || config === void 0 || (_config$onSuccess2 = config.onSuccess) === null || _config$onSuccess2 === void 0 || _config$onSuccess2.call(config, layer);
      };
    }
  }, {
    key: "cricular",
    value: function cricular(config) {
      var _this4 = this;
      this.removeEvents();
      this.canvas.style.cursor = 'crosshair';
      var circular_active = new CircularActiveLayer(config === null || config === void 0 ? void 0 : config.activeStyle);
      this.activedLayer = circular_active;
      var setAct = function setAct(n) {
        var p = _this4.getPosition(n);
        circular_active.setActived(p);
      };
      this.canvas.onmousedown = function (e) {
        if (e.button !== 0) return;
        var center = _this4.getPosition(e);
        circular_active.setCenter(center);
        _this4.canvas.addEventListener('mousemove', setAct);
      };
      this.canvas.onmouseup = function () {
        _this4.canvas.removeEventListener('mousemove', setAct);
        if (circular_active.center && circular_active.radius > 0) {
          var _config$onSuccess3;
          var _layer = new Circular({
            center: circular_active.center,
            radius: circular_active.radius,
            style: config === null || config === void 0 ? void 0 : config.cricularStyle
          });
          _this4.addlayer(_layer);
          _this4.afterPaint();
          config === null || config === void 0 || (_config$onSuccess3 = config.onSuccess) === null || _config$onSuccess3 === void 0 || _config$onSuccess3.call(config, _layer);
        }
      };
      this.canvas.onmouseleave = function () {
        _this4.canvas.removeEventListener('mousemove', setAct);
        _this4.afterPaint();
      };
    }
  }, {
    key: "geometry",
    value: function geometry(config) {
      var _this5 = this;
      this.removeEvents();
      this.canvas.style.cursor = 'crosshair';
      var timeId;
      var geometry_active = new GeometryActiveLayer(config === null || config === void 0 ? void 0 : config.activeStyle);
      this.activedLayer = geometry_active;
      this.canvas.onmousedown = function (e) {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(function () {
          if (e.button !== 0) return;
          var p = _this5.getPosition(e);
          geometry_active.updatePath(p);
          _this5.canvas.onmousemove = function (n) {
            var m = _this5.getPosition(n);
            geometry_active.setActived(m);
          };
        }, 100);
      };
      this.canvas.oncontextmenu = function (e) {
        e.preventDefault();
        clearTimeout(timeId);
        if (geometry_active) {
          if (!geometry_active.first) {
            // cancel
            _this5.afterPaint();
          } else {
            geometry_active.clearPath();
          }
        }
      };
      this.canvas.ondblclick = function (e) {
        e.stopPropagation();
        e.preventDefault();
        clearTimeout(timeId);
        if (geometry_active.isClose) {
          var _config$onSuccess4;
          var path = geometry_active.genPath();
          var _layer2 = new Geometry({
            path: path,
            style: config === null || config === void 0 ? void 0 : config.geoStyle
          });
          _this5.addlayer(_layer2);
          config === null || config === void 0 || (_config$onSuccess4 = config.onSuccess) === null || _config$onSuccess4 === void 0 || _config$onSuccess4.call(config, _layer2);
          _this5.afterPaint();
        }
      };
    }
  }, {
    key: "rect",
    value: function rect(config) {
      var _this6 = this;
      this.removeEvents();
      this.canvas.style.cursor = 'crosshair';
      var rect_active = new RectActiveLayer(config === null || config === void 0 ? void 0 : config.activeStyle);
      this.activedLayer = rect_active;
      var setAct = function setAct(n) {
        rect_active.setActived(_this6.getPosition(n));
      };
      this.canvas.onmousedown = function (e) {
        if (e.button !== 0) return;
        _this6.canvas.addEventListener('mousemove', setAct);
        rect_active.setStart(_this6.getPosition(e));
      };
      this.canvas.onmouseup = function (e) {
        _this6.canvas.removeEventListener('mousemove', setAct);
        var end = _this6.getPosition(e);
        if (rect_active.start && rect_active.width > 20 && rect_active.height > 20) {
          var _config$onSuccess5;
          var _layer3 = new Rect({
            start: rect_active.start,
            end: end,
            style: config === null || config === void 0 ? void 0 : config.rectStyle
          });
          _this6.addlayer(_layer3);
          _this6.afterPaint();
          config === null || config === void 0 || (_config$onSuccess5 = config.onSuccess) === null || _config$onSuccess5 === void 0 || _config$onSuccess5.call(config, _layer3);
        } else {
          rect_active.reset();
        }
      };
      this.canvas.onmouseleave = function () {
        _this6.afterPaint();
      };
    }
  }]);
  return Draw;
}(Core);
export { Draw as default };