function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
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
import Layer from "../../core/layer";
import Point from "../../core/point";
import { styleMerge } from "../../utils";
import GeometryEdit from "./edit";
var DEFAULT_STYLE = {
  backgroundColor: 'rgba(3,3,3,.2)',
  borderColor: 'transparent',
  borderWidth: 1,
  dashed: false
};
var Geometry = /*#__PURE__*/function (_Layer) {
  _inherits(Geometry, _Layer);
  var _super = _createSuper(Geometry);
  function Geometry(_ref) {
    var _this;
    var _ref$path = _ref.path,
      path = _ref$path === void 0 ? [] : _ref$path,
      style = _ref.style;
    _classCallCheck(this, Geometry);
    _this = _super.call(this, 'geometry');
    _defineProperty(_assertThisInitialized(_this), "style", void 0);
    _defineProperty(_assertThisInitialized(_this), "styleBack", void 0);
    _defineProperty(_assertThisInitialized(_this), "path", void 0);
    _defineProperty(_assertThisInitialized(_this), "pathBack", void 0);
    _defineProperty(_assertThisInitialized(_this), "editLayer", void 0);
    _this.style = _this.styleBack = styleMerge(DEFAULT_STYLE, style);
    _this.path = _this.pathBack = path;
    return _this;
  }
  _createClass(Geometry, [{
    key: "getArea",
    value: function getArea() {
      // 鞋带公式： s = 1/2 * |limt (i=1, n) (x<i>*y<i-1> - x<i+1>* y<i>|
      var area = 0;
      var len = this.path.length;
      var j = len - 1;
      var p1, p2;
      for (var i = 0; i < len; j = i++) {
        p1 = this.path[i];
        p2 = this.path[j];
        area += p1.x * p2.y;
        area -= p1.y * p2.x;
      }
      area /= 2;
      return area;
    }
  }, {
    key: "getCenter",
    value: function getCenter() {
      var len = this.path.length;
      if (len <= 1) return undefined;
      var x = 0;
      var y = 0;
      var f;
      var j = len - 1;
      var p1;
      var p2;
      for (var i = 0; i < len; j = i++) {
        p1 = this.path[i];
        p2 = this.path[j];
        f = p1.x * p2.y - p2.x * p1.y;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
      }
      f = this.getArea() * 6;
      return new Point(x / f, y / f);
    }

    // 射线法判断是否在路径中
  }, {
    key: "isInPath",
    value: function isInPath(p) {
      if (this.isEdit) {
        var _this$editLayer$isInP, _this$editLayer;
        return (_this$editLayer$isInP = (_this$editLayer = this.editLayer) === null || _this$editLayer === void 0 ? void 0 : _this$editLayer.isInPath(p)) !== null && _this$editLayer$isInP !== void 0 ? _this$editLayer$isInP : false;
      } else {
        var c = false;
        for (var i = -1, l = this.path.length, j = l - 1; ++i < l; j = i) (this.path[i].y <= p.y && p.y < this.path[j].y || this.path[j].y <= p.y && p.y < this.path[i].y) && p.x < (this.path[j].x - this.path[i].x) * (p.y - this.path[i].y) / (this.path[j].y - this.path[i].y) + this.path[i].x && (c = !c);
        return c;
      }
    }
  }, {
    key: "render",
    value: function render(context, scale) {
      if (this.isEdit) {
        var _this$editLayer2;
        (_this$editLayer2 = this.editLayer) === null || _this$editLayer2 === void 0 || _this$editLayer2.paint(context, scale);
      } else {
        var _this$path$0$getTrueP = this.path[0].getTruePosition(scale),
          _this$path$0$getTrueP2 = _slicedToArray(_this$path$0$getTrueP, 2),
          fx = _this$path$0$getTrueP2[0],
          fy = _this$path$0$getTrueP2[1];
        context.beginPath();
        this.style.borderWidth > 0 && (context.lineWidth = this.style.borderWidth);
        this.style.dashed ? context.setLineDash([5]) : context.setLineDash([0]);
        context.strokeStyle = this.style.borderColor;
        context.fillStyle = this.style.backgroundColor;
        context.moveTo(fx, fy);
        for (var i = 1; i < this.path.length; i++) {
          var _this$path$i$getTrueP = this.path[i].getTruePosition(scale),
            _this$path$i$getTrueP2 = _slicedToArray(_this$path$i$getTrueP, 2),
            x = _this$path$i$getTrueP2[0],
            y = _this$path$i$getTrueP2[1];
          context.lineTo(x, y);
        }
        context.lineTo(fx, fy);
        context.closePath();
        context.fill();
        context.stroke();
      }
    }
  }, {
    key: "startEdit",
    value: function startEdit() {
      this.isEdit = true;
      this.editLayer = new GeometryEdit(this.path, this.style);
    }
  }, {
    key: "saveEdit",
    value: function saveEdit() {
      if (this.editLayer) {
        var _this$editLayer$onSav = this.editLayer.onSave(),
          path = _this$editLayer$onSav.path,
          style = _this$editLayer$onSav.style;
        this.path = path.map(function (p) {
          return Point.clone(p);
        });
        this.pathBack = path.map(function (p) {
          return Point.clone(p);
        });
        this.style = this.styleBack = style;
        this.editLayer = undefined;
        this.isEdit = false;
      }
    }
  }, {
    key: "cancelEdit",
    value: function cancelEdit() {
      this.editLayer = undefined;
      this.isEdit = false;
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.path = this.pathBack.map(function (p) {
        return Point.clone(p);
      });
      this.style = this.styleBack;
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(position) {
      if (this.isEdit) {
        var _this$editLayer3;
        (_this$editLayer3 = this.editLayer) === null || _this$editLayer3 === void 0 || _this$editLayer3.mousedown.call(this.editLayer, position);
      }
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(position) {
      if (this.isEdit) {
        var _this$editLayer4;
        (_this$editLayer4 = this.editLayer) === null || _this$editLayer4 === void 0 || _this$editLayer4.mousemove.call(this.editLayer, position);
      }
    }
  }]);
  return Geometry;
}(Layer);
export { Geometry as default };