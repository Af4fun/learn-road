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
import CircularEdit from "./edit";
var DEFAULT_STYLE = {
  backgroundColor: "rgba(3,3,3,.2)",
  borderColor: "transparent",
  borderWidth: 1,
  dashed: false
};
var Circular = /*#__PURE__*/function (_Layer) {
  _inherits(Circular, _Layer);
  var _super = _createSuper(Circular);
  function Circular(_ref) {
    var _this;
    var center = _ref.center,
      radius = _ref.radius,
      style = _ref.style;
    _classCallCheck(this, Circular);
    _this = _super.call(this, "circular");
    _defineProperty(_assertThisInitialized(_this), "style", void 0);
    _defineProperty(_assertThisInitialized(_this), "styleBack", void 0);
    _defineProperty(_assertThisInitialized(_this), "center", void 0);
    _defineProperty(_assertThisInitialized(_this), "centerBack", void 0);
    _defineProperty(_assertThisInitialized(_this), "radius", void 0);
    _defineProperty(_assertThisInitialized(_this), "radiusBack", void 0);
    _defineProperty(_assertThisInitialized(_this), "editLayer", void 0);
    _this.style = _this.styleBack = styleMerge(DEFAULT_STYLE, style);
    _this.center = _this.centerBack = Point.clone(center);
    _this.radius = _this.radiusBack = Number(radius.toFixed(2));
    return _this;
  }
  _createClass(Circular, [{
    key: "render",
    value: function render(context, scale) {
      if (this.isEdit) {
        var _this$editLayer;
        (_this$editLayer = this.editLayer) === null || _this$editLayer === void 0 || _this$editLayer.draw(context, scale);
      } else {
        context.beginPath();
        context.lineWidth = this.style.borderWidth;
        this.style.dashed ? context.setLineDash([5]) : context.setLineDash([0]);
        context.strokeStyle = this.style.borderColor;
        context.fillStyle = this.style.backgroundColor;
        var _this$center$getTrueP = this.center.getTruePosition(scale),
          _this$center$getTrueP2 = _slicedToArray(_this$center$getTrueP, 2),
          x = _this$center$getTrueP2[0],
          y = _this$center$getTrueP2[1];
        context.arc(x, y, this.radius / scale, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
      }
    }
  }, {
    key: "getArea",
    value: function getArea() {
      return Math.PI * Math.pow(this.radius, 2);
    }
  }, {
    key: "isInPath",
    value: function isInPath(p) {
      if (this.isEdit) {
        var _this$editLayer$isInP, _this$editLayer2;
        return (_this$editLayer$isInP = (_this$editLayer2 = this.editLayer) === null || _this$editLayer2 === void 0 ? void 0 : _this$editLayer2.isInPath(p)) !== null && _this$editLayer$isInP !== void 0 ? _this$editLayer$isInP : false;
      } else {
        var d = Math.sqrt(Math.pow(p.y - this.center.y, 2) + Math.pow(p.x - this.center.x, 2));
        return d < this.radius;
      }
    }
  }, {
    key: "startEdit",
    value: function startEdit() {
      this.isEdit = true;
      this.editLayer = new CircularEdit(this.center, this.radius, this.style);
    }
  }, {
    key: "saveEdit",
    value: function saveEdit() {
      if (this.editLayer) {
        var _this$editLayer$onSav = this.editLayer.onSave(),
          center = _this$editLayer$onSav.center,
          radius = _this$editLayer$onSav.radius,
          style = _this$editLayer$onSav.style;
        this.center = Point.clone(center);
        this.centerBack = Point.clone(center);
        this.style = this.styleBack = style;
        this.radius = radius;
        this.radiusBack = radius;
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
      this.center = Point.clone(this.centerBack);
      this.style = this.styleBack;
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(position) {
      if (this.isEdit) {
        var _this$editLayer3;
        (_this$editLayer3 = this.editLayer) === null || _this$editLayer3 === void 0 || _this$editLayer3.onmousedown.call(this.editLayer, position);
      }
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(position) {
      if (this.isEdit) {
        var _this$editLayer4;
        (_this$editLayer4 = this.editLayer) === null || _this$editLayer4 === void 0 || _this$editLayer4.onmousemove.call(this.editLayer, position);
      }
    }
  }]);
  return Circular;
}(Layer);
export { Circular as default };