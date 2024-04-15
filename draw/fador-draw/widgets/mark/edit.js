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
var MarkEdit = /*#__PURE__*/function () {
  function MarkEdit(opt) {
    _classCallCheck(this, MarkEdit);
    _defineProperty(this, "center", void 0);
    _defineProperty(this, "image", void 0);
    _defineProperty(this, "style", void 0);
    _defineProperty(this, "sx", 0);
    _defineProperty(this, "sy", 0);
    _defineProperty(this, "px", 0);
    _defineProperty(this, "py", 0);
    var style = opt.style,
      image = opt.image,
      center = opt.center;
    this.image = image;
    this.style = style;
    this.center = center;
  }
  _createClass(MarkEdit, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.save();
      if (this.image) {
        var dx = this.center.x - 10;
        var dy = this.center.y - 38;
        ctx.drawImage(this.image, dx,
        // image的左上角在目标canvas上 X 轴坐标。
        dy,
        // image的左上角在目标canvas上 Y 轴坐标。
        40,
        // img 在canvas 上绘制的宽度 dWidth  设置后图片将会缩放
        40 // img 在canvas 上绘制的高度 dHeight
        );
      } else {
        ctx.beginPath();
        ctx.fillStyle = this.style.color;
        ctx.arc(this.center.x, this.center.y, this.style.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
      ctx.restore();
    }
  }, {
    key: "isInPath",
    value: function isInPath(p) {
      var _this$center$toArray = this.center.toArray(),
        _this$center$toArray2 = _slicedToArray(_this$center$toArray, 2),
        cx = _this$center$toArray2[0],
        cy = _this$center$toArray2[1];
      var _p$toArray = p.toArray(),
        _p$toArray2 = _slicedToArray(_p$toArray, 2),
        x = _p$toArray2[0],
        y = _p$toArray2[1];
      if (this.image) {
        var xisAllow = x >= cx - 10 && x <= cx + 10;
        var yisAllow = y >= cy - 40 && y <= cy;
        return xisAllow && yisAllow;
      } else {
        var d = Math.sqrt(Math.pow(y - this.center.y, 2) + Math.pow(x - this.center.x, 2));
        return d < this.style.size * 2;
      }
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(style) {
      this.style = style;
    }
  }, {
    key: "mousedown",
    value: function mousedown(position) {
      this.sx = position.x;
      this.sy = position.y;
      this.px = this.center.x;
      this.py = this.center.y;
    }
  }, {
    key: "mousemove",
    value: function mousemove(end) {
      var x = end.x - this.sx;
      var y = end.y - this.sy;
      this.center = new Point(this.px + x, this.py + y);
    }
  }, {
    key: "save",
    value: function save() {
      return {
        center: this.center,
        style: this.style
      };
    }
  }]);
  return MarkEdit;
}();
export { MarkEdit as default };