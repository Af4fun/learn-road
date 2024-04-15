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
import RectEdit from "./edit";
var DEFAULT_STYLE = {
  backgroundColor: 'rgba(3,3,3,.2)',
  borderColor: 'transparent',
  borderWidth: 1,
  dashed: false
};
var Rect = /*#__PURE__*/function (_Layer) {
  _inherits(Rect, _Layer);
  var _super = _createSuper(Rect);
  function Rect(_ref) {
    var _this;
    var start = _ref.start,
      end = _ref.end,
      style = _ref.style;
    _classCallCheck(this, Rect);
    _this = _super.call(this, 'rect');
    _defineProperty(_assertThisInitialized(_this), "style", void 0);
    _defineProperty(_assertThisInitialized(_this), "styleBackup", void 0);
    _defineProperty(_assertThisInitialized(_this), "start", void 0);
    _defineProperty(_assertThisInitialized(_this), "_startBackup", void 0);
    _defineProperty(_assertThisInitialized(_this), "end", void 0);
    _defineProperty(_assertThisInitialized(_this), "_endBackup", void 0);
    _defineProperty(_assertThisInitialized(_this), "editLayer", void 0);
    _this.start = _this._startBackup = Point.clone(start);
    _this.end = _this._endBackup = Point.clone(end);
    _this.style = _this.styleBackup = styleMerge(DEFAULT_STYLE, style);
    return _this;
  }
  _createClass(Rect, [{
    key: "getCenter",
    value: function getCenter() {
      return Point.getCenter(this.start, this.end);
    }
  }, {
    key: "render",
    value: function render(ctx, scale) {
      if (this.isEdit) {
        var _this$editLayer;
        (_this$editLayer = this.editLayer) === null || _this$editLayer === void 0 || _this$editLayer.render(ctx, scale);
      } else {
        ctx.beginPath();
        this.style.borderWidth > 0 && (ctx.lineWidth = this.style.borderWidth);
        this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
        ctx.strokeStyle = this.style.borderColor;
        ctx.fillStyle = this.style.backgroundColor;
        var _this$start$getTruePo = this.start.getTruePosition(scale),
          _this$start$getTruePo2 = _slicedToArray(_this$start$getTruePo, 2),
          sx = _this$start$getTruePo2[0],
          sy = _this$start$getTruePo2[1];
        var _this$end$getTruePosi = this.end.getTruePosition(scale),
          _this$end$getTruePosi2 = _slicedToArray(_this$end$getTruePosi, 2),
          ex = _this$end$getTruePosi2[0],
          ey = _this$end$getTruePosi2[1];
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, sy);
        ctx.lineTo(ex, ey);
        ctx.lineTo(sx, ey);
        ctx.lineTo(sx, sy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  }, {
    key: "isInPath",
    value: function isInPath(p) {
      if (this.isEdit) {
        var _this$editLayer$isInP, _this$editLayer2;
        return (_this$editLayer$isInP = (_this$editLayer2 = this.editLayer) === null || _this$editLayer2 === void 0 ? void 0 : _this$editLayer2.isInPath(p)) !== null && _this$editLayer$isInP !== void 0 ? _this$editLayer$isInP : false;
      } else {
        var xisAllow = p.x >= this.start.x && p.x <= this.end.x;
        var yisAllow = p.y >= this.start.y && p.y <= this.end.y;
        return xisAllow && yisAllow;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.start = this._startBackup;
      this.end = this._endBackup;
      this.style = this.styleBackup;
    }
  }, {
    key: "startEdit",
    value: function startEdit() {
      this.isEdit = true;
      this.editLayer = new RectEdit(this.start, this.end, this.style);
    }
  }, {
    key: "saveEdit",
    value: function saveEdit() {
      if (this.editLayer) {
        var _this$editLayer$onSav = this.editLayer.onSave(),
          start = _this$editLayer$onSav.start,
          end = _this$editLayer$onSav.end,
          style = _this$editLayer$onSav.style;
        this.end = Point.clone(end);
        this.start = Point.clone(start);
        this._startBackup = Point.clone(start);
        this._endBackup = Point.clone(end);
        this.style = style;
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
  return Rect;
}(Layer);
export { Rect as default };