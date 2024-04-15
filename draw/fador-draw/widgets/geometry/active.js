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
var GEOMENTRY_DEFAULT_STYLE = {
  node: {
    color: "#1890ff",
    borderWidth: 2,
    borderColor: "green"
  },
  nodeLine: {
    width: 2,
    color: "green"
  },
  backgroundColor: "rgba(255,255,0, .5)"
};
export var GeometryActiveLayer = /*#__PURE__*/function () {
  function GeometryActiveLayer(config) {
    _classCallCheck(this, GeometryActiveLayer);
    _defineProperty(this, "style", void 0);
    _defineProperty(this, "paths", []);
    _defineProperty(this, "actived", void 0);
    _defineProperty(this, "isClose", false);
    this.style = styleMerge(GEOMENTRY_DEFAULT_STYLE, config);
  }
  _createClass(GeometryActiveLayer, [{
    key: "reset",
    value: function reset() {
      this.paths = [];
      this.actived = undefined;
      this.isClose = false;
    }
  }, {
    key: "updatePath",
    value: function updatePath(p) {
      this.paths.push(p);
    }
  }, {
    key: "setActived",
    value: function setActived(p) {
      this.actived = p;
      this.isClose = this.paths.length > 1;
    }
  }, {
    key: "first",
    get: function get() {
      return this.paths[0];
    }
  }, {
    key: "last",
    get: function get() {
      if (!this.paths.length) return undefined;
      return this.paths[this.paths.length - 1];
    }
  }, {
    key: "render",
    value: function render(context, scale) {
      if (!this.first) return;
      context.save();
      if (this.paths.length == 1) {
        this.drawActive(context, scale);
        this.drawStart(context, scale);
      } else {
        this.drawLine(context, scale);
        this.drawNode(context, scale);
      }
      context.restore();
    }
  }, {
    key: "drawActive",
    value: function drawActive(ctx, scale) {
      if (!this.last || !this.actived) return;
      ctx.beginPath();
      ctx.lineWidth = this.style.nodeLine.width;
      ctx.strokeStyle = this.style.nodeLine.color;
      ctx.setLineDash([5]);
      var _this$last$getTruePos = this.last.getTruePosition(scale),
        _this$last$getTruePos2 = _slicedToArray(_this$last$getTruePos, 2),
        lx = _this$last$getTruePos2[0],
        ly = _this$last$getTruePos2[1];
      ctx.moveTo(lx, ly);
      var _this$actived$getTrue = this.actived.getTruePosition(scale),
        _this$actived$getTrue2 = _slicedToArray(_this$actived$getTrue, 2),
        ax = _this$actived$getTrue2[0],
        ay = _this$actived$getTrue2[1];
      ctx.lineTo(ax, ay);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "drawStart",
    value: function drawStart(ctx, scale) {
      if (!this.first) return;
      ctx.strokeStyle = this.style.node.borderColor;
      ctx.lineWidth = this.style.node.borderWidth;
      ctx.setLineDash([0]);
      ctx.beginPath();
      ctx.fillStyle = this.style.node.color;
      var _this$first$getTruePo = this.first.getTruePosition(scale),
        _this$first$getTruePo2 = _slicedToArray(_this$first$getTruePo, 2),
        x = _this$first$getTruePo2[0],
        y = _this$first$getTruePo2[1];
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "drawLine",
    value: function drawLine(ctx, scale) {
      if (!this.first || !this.actived) return;
      ctx.beginPath();
      ctx.strokeStyle = this.style.nodeLine.color;
      ctx.lineWidth = this.style.nodeLine.width;
      ctx.setLineDash([5]);
      var _this$first$getTruePo3 = this.first.getTruePosition(scale),
        _this$first$getTruePo4 = _slicedToArray(_this$first$getTruePo3, 2),
        fx = _this$first$getTruePo4[0],
        fy = _this$first$getTruePo4[1];
      ctx.moveTo(fx, fy);
      for (var i = 1; i < this.paths.length; i++) {
        var _this$paths$i$getTrue = this.paths[i].getTruePosition(scale),
          _this$paths$i$getTrue2 = _slicedToArray(_this$paths$i$getTrue, 2),
          x = _this$paths$i$getTrue2[0],
          y = _this$paths$i$getTrue2[1];
        ctx.lineTo(x, y);
      }
      var _this$actived$getTrue3 = this.actived.getTruePosition(scale),
        _this$actived$getTrue4 = _slicedToArray(_this$actived$getTrue3, 2),
        ax = _this$actived$getTrue4[0],
        ay = _this$actived$getTrue4[1];
      ctx.lineTo(ax, ay);
      ctx.lineTo(fx, fy);
      ctx.fillStyle = this.style.backgroundColor;
      ctx.fill();
      ctx.stroke();
    }
  }, {
    key: "drawNode",
    value: function drawNode(ctx, scale) {
      ctx.setLineDash([0]);
      ctx.lineWidth = this.style.node.borderWidth;
      ctx.strokeStyle = this.style.node.borderColor;
      for (var i = 0; i < this.paths.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.style.node.color;
        var _this$paths$i$getTrue3 = this.paths[i].getTruePosition(scale),
          _this$paths$i$getTrue4 = _slicedToArray(_this$paths$i$getTrue3, 2),
          x = _this$paths$i$getTrue4[0],
          y = _this$paths$i$getTrue4[1];
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }
    }
  }, {
    key: "genPath",
    value: function genPath() {
      return this.paths.map(function (p) {
        return Point.clone(p);
      });
    }
  }, {
    key: "clearPath",
    value: function clearPath() {
      this.paths.pop();
    }
  }]);
  return GeometryActiveLayer;
}();