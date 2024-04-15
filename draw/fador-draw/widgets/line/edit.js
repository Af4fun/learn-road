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
var LineEdit = /*#__PURE__*/function () {
  function LineEdit(start, end, style) {
    _classCallCheck(this, LineEdit);
    _defineProperty(this, "start", void 0);
    _defineProperty(this, "end", void 0);
    _defineProperty(this, "active", void 0);
    _defineProperty(this, "sx", 0);
    _defineProperty(this, "sy", 0);
    _defineProperty(this, "px", 0);
    _defineProperty(this, "py", 0);
    _defineProperty(this, "ctrlRadius", 4);
    _defineProperty(this, "style", void 0);
    this.start = Point.clone(start);
    this.end = Point.clone(end);
    this.style = style;
  }
  _createClass(LineEdit, [{
    key: "paint",
    value: function paint(ctx, scale) {
      ctx.save();
      ctx.beginPath();
      this.style.width > 0 && (ctx.lineWidth = this.style.width);
      this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
      ctx.strokeStyle = this.style.color;
      var _this$start$getTruePo = this.start.getTruePosition(scale),
        _this$start$getTruePo2 = _slicedToArray(_this$start$getTruePo, 2),
        x = _this$start$getTruePo2[0],
        y = _this$start$getTruePo2[1];
      var _this$end$getTruePosi = this.end.getTruePosition(scale),
        _this$end$getTruePosi2 = _slicedToArray(_this$end$getTruePosi, 2),
        ex = _this$end$getTruePosi2[0],
        ey = _this$end$getTruePosi2[1];
      ctx.moveTo(x, y);
      ctx.lineTo(ex, ey);
      ctx.closePath();
      ctx.stroke();
      this.paintCtr(this.start, ctx, scale);
      this.paintCtr(this.end, ctx, scale);
      ctx.restore();
    }

    /** 绘制控制点 */
  }, {
    key: "paintCtr",
    value: function paintCtr(p, ctx, scale) {
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
    value: function isInCtrPoint(p, c) {
      return p.x > c.x - this.ctrlRadius && p.x < c.x + this.ctrlRadius && p.y > c.y - this.ctrlRadius && p.y < c.y + this.ctrlRadius;
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
      var offset_w = 10;
      // 线段旋转至水平需要转动的角度为 r
      var angle = Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
      var center = Point.getCenter(this.start, this.end);
      var _Point$rotateByPoint$ = Point.rotateByPoint(p, center, -angle).toArray(),
        _Point$rotateByPoint$2 = _slicedToArray(_Point$rotateByPoint$, 2),
        x = _Point$rotateByPoint$2[0],
        y = _Point$rotateByPoint$2[1];
      var _Point$rotateByPoint$3 = Point.rotateByPoint(this.start, center, -angle).toArray(),
        _Point$rotateByPoint$4 = _slicedToArray(_Point$rotateByPoint$3, 2),
        sx = _Point$rotateByPoint$4[0],
        sy = _Point$rotateByPoint$4[1];
      var _Point$rotateByPoint$5 = Point.rotateByPoint(this.end, center, -angle).toArray(),
        _Point$rotateByPoint$6 = _slicedToArray(_Point$rotateByPoint$5, 2),
        ex = _Point$rotateByPoint$6[0],
        ey = _Point$rotateByPoint$6[1];
      return Math.min(sx, ex) <= x && Math.max(sx, ex) >= x && Math.min(sy + offset_w, ey - offset_w) <= y && Math.max(sy + offset_w, ey - offset_w) >= y;
    }
  }, {
    key: "mousedown",
    value: function mousedown(p) {
      this.sx = p.x;
      this.sy = p.y;
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
    value: function mousemove(p) {
      var x = p.x - this.sx;
      var y = p.y - this.sy;
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
  return LineEdit;
}();
export { LineEdit as default };