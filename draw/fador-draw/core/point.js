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
var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    _classCallCheck(this, Point);
    /** 坐标轴上x坐标 */
    _defineProperty(this, "x", void 0);
    /** 坐标轴上y坐标 */
    _defineProperty(this, "y", void 0);
    this.x = Number(x.toFixed(2));
    this.y = Number(y.toFixed(2));
  }
  _createClass(Point, [{
    key: "toArray",
    value: function toArray() {
      return [this.x, this.y];
    }
  }, {
    key: "update",
    value: function update(x, y) {
      this.x = Number(x.toFixed(2));
      this.y = Number(y.toFixed(2));
    }
  }, {
    key: "getTruePosition",
    value: function getTruePosition(scale) {
      return [this.x / scale, this.y / scale];
    }

    // 相对于点旋转
  }], [{
    key: "rotateByPoint",
    value: function rotateByPoint(p, c, angle) {
      var x = (p.x - c.x) * Math.cos(angle) - (p.y - c.y) * Math.sin(angle) + c.x;
      var y = (p.x - c.x) * Math.sin(angle) + (p.y - c.y) * Math.cos(angle) + c.y;
      return new Point(x, y);
    }
  }, {
    key: "rotate",
    value: function rotate(p, angle) {
      return Point.rotateByPoint(p, new Point(0, 0), angle);
    }
  }, {
    key: "getCenter",
    value: function getCenter(start, end) {
      return new Point((start.x + end.x) / 2, (start.y + end.y) / 2);
    }
  }, {
    key: "fromArray",
    value: function fromArray(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];
      return new Point(x, y);
    }
  }, {
    key: "clone",
    value: function clone(p) {
      return new Point(p.x, p.y);
    }
  }]);
  return Point;
}();
export default Point;