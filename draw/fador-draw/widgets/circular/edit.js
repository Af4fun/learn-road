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
var CircularEdit = /*#__PURE__*/function () {
  function CircularEdit(center, radius, style) {
    _classCallCheck(this, CircularEdit);
    _defineProperty(this, "center", void 0);
    _defineProperty(this, "radius", void 0);
    _defineProperty(this, "ctrlRadius", 4);
    _defineProperty(this, "style", void 0);
    _defineProperty(this, "active", void 0);
    _defineProperty(this, "sx", 0);
    _defineProperty(this, "sy", 0);
    _defineProperty(this, "px", 0);
    _defineProperty(this, "py", 0);
    this.center = Point.clone(center);
    this.radius = radius;
    this.style = style;
  }
  _createClass(CircularEdit, [{
    key: "ctrPoint",
    get: function get() {
      var cx = this.center.x + this.radius;
      return new Point(cx, this.center.y);
    }
  }, {
    key: "draw",
    value: function draw(ctx, scale) {
      ctx.beginPath();
      ctx.lineWidth = this.style.borderWidth;
      this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
      ctx.strokeStyle = this.style.borderColor;
      ctx.fillStyle = this.style.backgroundColor;
      var _this$center$getTrueP = this.center.getTruePosition(scale),
        _this$center$getTrueP2 = _slicedToArray(_this$center$getTrueP, 2),
        x = _this$center$getTrueP2[0],
        y = _this$center$getTrueP2[1];
      ctx.arc(x, y, this.radius / scale, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      this.drawCtr(this.ctrPoint, ctx, scale);
      this.drawCtr(this.center, ctx, scale);
    }
  }, {
    key: "drawCtr",
    value: function drawCtr(p, ctx, scale) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([0]);
      ctx.strokeStyle = "green";
      ctx.fillStyle = "#1890ff";
      var _p$getTruePosition = p.getTruePosition(scale),
        _p$getTruePosition2 = _slicedToArray(_p$getTruePosition, 2),
        x = _p$getTruePosition2[0],
        y = _p$getTruePosition2[1];
      ctx.arc(x, y, this.ctrlRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
  }, {
    key: "isInCtrPoint",
    value: function isInCtrPoint(x, y, p) {
      return x > p.x - this.ctrlRadius && x < p.x + this.ctrlRadius && y > p.y - this.ctrlRadius && y < p.y + this.ctrlRadius;
    }
  }, {
    key: "isInPath",
    value: function isInPath(_ref) {
      var x = _ref.x,
        y = _ref.y;
      if (this.isInCtrPoint(x, y, this.center)) {
        this.active = "start";
        return true;
      } else if (this.isInCtrPoint(x, y, this.ctrPoint)) {
        this.active = "end";
        return true;
      }
      this.active = undefined;
      var d = Math.sqrt(Math.pow(y - this.center.y, 2) + Math.pow(x - this.center.x, 2));
      return d < this.radius;
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(p) {
      this.sx = p.x;
      this.sy = p.y;
      if (this.active == "start") {
        this.px = this.center.x;
        this.py = this.center.y;
      } else if (this.active == "end") {
        this.px = this.ctrPoint.x;
        this.py = this.ctrPoint.y;
      }
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(end) {
      var x = end.x - this.sx;
      var y = end.y - this.sy;
      if (this.active == "start") {
        this.center = new Point(this.px + x, this.py + y);
      } else if (this.active == "end") {
        this.radius = Math.sqrt(Math.pow(this.py + y - this.center.y, 2) + Math.pow(this.px + x - this.center.x, 2));
      }
    }
  }, {
    key: "onSave",
    value: function onSave() {
      return {
        center: this.center,
        radius: this.radius,
        style: this.style
      };
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(style) {
      this.style = style;
    }
  }, {
    key: "changeRadius",
    value: function changeRadius(radius) {
      this.radius = radius;
    }
  }]);
  return CircularEdit;
}();
export { CircularEdit as default };