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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import Point from "../../core/point";
import { styleMerge } from "../../utils";
var DEFAULT_STYLE = {
  borderWidth: 2,
  borderColor: "green",
  backgroundColor: "rgba(255,255,0, .5)",
  dashed: true
};
var CircularActiveLayer = /*#__PURE__*/function () {
  function CircularActiveLayer(config) {
    _classCallCheck(this, CircularActiveLayer);
    _defineProperty(this, "center", void 0);
    _defineProperty(this, "actived", void 0);
    _defineProperty(this, "style", void 0);
    this.style = styleMerge(DEFAULT_STYLE, config);
  }
  _createClass(CircularActiveLayer, [{
    key: "setActived",
    value: function setActived(p) {
      if (this.center) {
        this.actived = Point.clone(p);
      }
    }
  }, {
    key: "setCenter",
    value: function setCenter(center) {
      this.center = center;
    }
  }, {
    key: "radius",
    get: function get() {
      if (!this.center || !this.actived) return 0;
      return Math.sqrt(Math.pow(this.center.y - this.actived.y, 2) + Math.pow(this.center.x - this.actived.x, 2));
    }
  }, {
    key: "reset",
    value: function reset() {
      this.center = undefined;
      this.actived = undefined;
    }
  }, {
    key: "drawCenter",
    value: function drawCenter(ctx, scale) {
      if (this.center) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.style.borderColor;
        ctx.lineWidth = 0;
        ctx.setLineDash([0]);
        var _this$center$getTrueP = this.center.getTruePosition(scale),
          _this$center$getTrueP2 = _slicedToArray(_this$center$getTrueP, 2),
          x = _this$center$getTrueP2[0],
          y = _this$center$getTrueP2[1];
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
  }, {
    key: "render",
    value: function render(ctx, scale) {
      if (this.center && this.radius) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = this.style.borderWidth;
        this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
        ctx.strokeStyle = this.style.borderColor;
        ctx.fillStyle = this.style.backgroundColor;
        var _this$center$getTrueP3 = this.center.getTruePosition(scale),
          _this$center$getTrueP4 = _slicedToArray(_this$center$getTrueP3, 2),
          x = _this$center$getTrueP4[0],
          y = _this$center$getTrueP4[1];
        ctx.arc(x, y, this.radius / scale, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        this.drawCenter(ctx, scale);
        ctx.restore();
      }
    }
  }]);
  return CircularActiveLayer;
}();
export { CircularActiveLayer as default };