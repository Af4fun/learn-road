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
var GeometryEdit = /*#__PURE__*/function () {
  function GeometryEdit(paths, style) {
    _classCallCheck(this, GeometryEdit);
    _defineProperty(this, "path", void 0);
    _defineProperty(this, "style", void 0);
    _defineProperty(this, "sx", 0);
    _defineProperty(this, "sy", 0);
    _defineProperty(this, "px", 0);
    _defineProperty(this, "py", 0);
    _defineProperty(this, "ctrlRadius", 4);
    _defineProperty(this, "actived", -1);
    _defineProperty(this, "targets", "path");
    this.path = paths.map(function (p) {
      return Point.clone(p);
    });
    this.style = style;
  }
  _createClass(GeometryEdit, [{
    key: "paint",
    value: function paint(ctx, scale) {
      ctx.beginPath();
      this.style.borderWidth > 0 && (ctx.lineWidth = this.style.borderWidth);
      this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
      ctx.strokeStyle = this.style.borderColor;
      ctx.fillStyle = this.style.backgroundColor;
      var _this$path$0$getTrueP = this.path[0].getTruePosition(scale),
        _this$path$0$getTrueP2 = _slicedToArray(_this$path$0$getTrueP, 2),
        fx = _this$path$0$getTrueP2[0],
        fy = _this$path$0$getTrueP2[1];
      ctx.moveTo(fx, fy);
      for (var i = 1; i < this.path.length; i++) {
        var _this$path$i$getTrueP = this.path[i].getTruePosition(scale),
          _this$path$i$getTrueP2 = _slicedToArray(_this$path$i$getTrueP, 2),
          x = _this$path$i$getTrueP2[0],
          y = _this$path$i$getTrueP2[1];
        ctx.lineTo(x, y);
      }
      ctx.lineTo(fx, fy);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      for (var _i = 0; _i < this.path.length; _i++) {
        this.drawCtr(this.path[_i], ctx, scale);
      }
      for (var _i2 = 0; _i2 < this.centers.length; _i2++) {
        this.drawCtrCenter(this.centers[_i2], ctx, scale);
      }
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
    key: "drawCtrCenter",
    value: function drawCtrCenter(p, ctx, scale) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([0]);
      ctx.strokeStyle = "#e4393c";
      var _p$getTruePosition3 = p.getTruePosition(scale),
        _p$getTruePosition4 = _slicedToArray(_p$getTruePosition3, 2),
        px = _p$getTruePosition4[0],
        py = _p$getTruePosition4[1];
      ctx.arc(px, py, this.ctrlRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();
    }
  }, {
    key: "isInCtrPoint",
    value: function isInCtrPoint(x, y, p) {
      return x > p.x - this.ctrlRadius && x < p.x + this.ctrlRadius && y > p.y - this.ctrlRadius && y < p.y + this.ctrlRadius;
    }
  }, {
    key: "centers",
    get: function get() {
      var centers = [];
      for (var i = 0; i < this.path.length; i++) {
        if (this.path[i + 1]) {
          var _this$path$i$toArray = this.path[i].toArray(),
            _this$path$i$toArray2 = _slicedToArray(_this$path$i$toArray, 2),
            _sx = _this$path$i$toArray2[0],
            _sy = _this$path$i$toArray2[1];
          var _this$path$toArray = this.path[i + 1].toArray(),
            _this$path$toArray2 = _slicedToArray(_this$path$toArray, 2),
            _ex = _this$path$toArray2[0],
            _ey = _this$path$toArray2[1];
          var center = new Point((_ex + _sx) / 2, (_ey + _sy) / 2);
          centers.push(center);
        }
      }
      var _this$path$0$toArray = this.path[0].toArray(),
        _this$path$0$toArray2 = _slicedToArray(_this$path$0$toArray, 2),
        sx = _this$path$0$toArray2[0],
        sy = _this$path$0$toArray2[1];
      var _this$path$toArray3 = this.path[this.path.length - 1].toArray(),
        _this$path$toArray4 = _slicedToArray(_this$path$toArray3, 2),
        ex = _this$path$toArray4[0],
        ey = _this$path$toArray4[1];
      var fc = new Point((ex + sx) / 2, (ey + sy) / 2);
      centers.push(fc);
      return centers;
    }
  }, {
    key: "isInPath",
    value: function isInPath(p) {
      for (var i = 0; i < this.path.length; i++) {
        if (this.isInCtrPoint(p.x, p.y, this.path[i])) {
          this.targets = "path";
          this.actived = i;
          return true;
        }
      }
      for (var _i3 = 0; _i3 < this.centers.length; _i3++) {
        if (this.isInCtrPoint(p.x, p.y, this.centers[_i3])) {
          this.targets = "center";
          this.actived = _i3;
          return true;
        }
      }
      var c = false;
      for (var _i4 = -1, l = this.path.length, j = l - 1; ++_i4 < l; j = _i4) (this.path[_i4].y <= p.y && p.y < this.path[j].y || this.path[j].y <= p.y && p.y < this.path[_i4].y) && p.x < (this.path[j].x - this.path[_i4].x) * (p.y - this.path[_i4].y) / (this.path[j].y - this.path[_i4].y) + this.path[_i4].x && (c = !c);
      return c;
    }
  }, {
    key: "mousedown",
    value: function mousedown(p) {
      this.sx = p.x;
      this.sy = p.y;
      if (this.targets == "path") {
        var el = this.path[this.actived];
        this.px = el.x;
        this.py = el.y;
      } else if (this.targets == "center") {
        var _el = this.centers[this.actived];
        this.px = _el.x;
        this.py = _el.y;
      }
    }
  }, {
    key: "mousemove",
    value: function mousemove(end) {
      var x = end.x - this.sx;
      var y = end.y - this.sy;
      var newPoint = new Point(this.px + x, this.py + y);
      if (this.targets == "path") {
        this.path.splice(this.actived, 1, newPoint);
      } else {
        this.path.splice(this.actived + 1, 0, newPoint);
        this.targets = "path";
        this.actived += 1;
      }
    }
  }, {
    key: "onSave",
    value: function onSave() {
      return {
        path: this.path,
        style: this.style
      };
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(style) {
      this.style = style;
    }
  }]);
  return GeometryEdit;
}();
export { GeometryEdit as default };