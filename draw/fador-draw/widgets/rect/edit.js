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
var RectEdit = /*#__PURE__*/function () {
  function RectEdit(start, end, style) {
    _classCallCheck(this, RectEdit);
    _defineProperty(this, "start", void 0);
    _defineProperty(this, "end", void 0);
    _defineProperty(this, "active", void 0);
    _defineProperty(this, "style", void 0);
    _defineProperty(this, "sx", 0);
    _defineProperty(this, "sy", 0);
    _defineProperty(this, "px", 0);
    _defineProperty(this, "py", 0);
    _defineProperty(this, "ctrlRadius", 4);
    this.start = Point.clone(start);
    this.end = Point.clone(end);
    this.style = style;
  }
  _createClass(RectEdit, [{
    key: "render",
    value: function render(ctx, scale) {
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
      this.drawCtr(this.start, ctx, scale);
      this.drawCtr(this.end, ctx, scale);
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
        px = _p$getTruePosition2[0],
        py = _p$getTruePosition2[1];
      ctx.arc(px, py, this.ctrlRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
  }, {
    key: "isInCtrPoint",
    value: function isInCtrPoint(_ref, p) {
      var x = _ref.x,
        y = _ref.y;
      return x > p.x - this.ctrlRadius && x < p.x + this.ctrlRadius && y > p.y - this.ctrlRadius && y < p.y + this.ctrlRadius;
    }
  }, {
    key: "isInPath",
    value: function isInPath(p) {
      if (this.isInCtrPoint(p, this.start)) {
        this.active = "start";
        return true;
      } else if (this.isInCtrPoint(p, this.end)) {
        this.active = "end";
        return true;
      }
      this.active = undefined;
      var xisAllow = p.x >= this.start.x && p.x <= this.end.x;
      var yisAllow = p.y >= this.start.y && p.y <= this.end.y;
      return xisAllow && yisAllow;
    }
  }, {
    key: "mousedown",
    value: function mousedown(position) {
      this.sx = position.x;
      this.sy = position.y;
      if (this.active == "start") {
        this.px = this.start.x;
        this.py = this.start.y;
      } else if (this.active == "end") {
        this.px = this.end.x;
        this.py = this.end.y;
      }
    }
  }, {
    key: "mousemove",
    value: function mousemove(end) {
      var x = end.x - this.sx;
      var y = end.y - this.sy;
      if (this.active == "start") {
        this.start = new Point(this.px + x, this.py + y);
      } else if (this.active == "end") {
        this.end = new Point(this.px + x, this.py + y);
      }
    }
  }, {
    key: "onSave",
    value: function onSave() {
      return {
        start: this.start,
        end: this.end,
        style: this.style
      };
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(style) {
      this.style = style;
    }
  }]);
  return RectEdit;
}();
export { RectEdit as default };