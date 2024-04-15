function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { genUuid } from "../utils";
import EventCenter from "../utils/event";
import Point from "./point";
var Layer = /*#__PURE__*/function () {
  function Layer(type) {
    _classCallCheck(this, Layer);
    _defineProperty(this, "uuid", void 0);
    _defineProperty(this, "type", void 0);
    _defineProperty(this, "isEdit", false);
    _defineProperty(this, "isMouseIn", false);
    _defineProperty(this, "origin", new Point(0, 0));
    _defineProperty(this, "evetCenter", new EventCenter());
    this.uuid = genUuid();
    this.type = type;
  }

  // 触发外部canvas事件 响应到对应的layer事件
  _createClass(Layer, [{
    key: "update",
    value: function update(action) {
      var actionFunc = Object.getPrototypeOf(this)[action];
      for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arg[_key - 1] = arguments[_key];
      }
      if (actionFunc) return actionFunc.apply(this, arg);
    }
  }, {
    key: "emit",
    value: function emit(action) {
      var _this$evetCenter;
      for (var _len2 = arguments.length, arg = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        arg[_key2 - 1] = arguments[_key2];
      }
      (_this$evetCenter = this.evetCenter).emit.apply(_this$evetCenter, [action].concat(arg));
    }
  }, {
    key: "onclick",
    value: function onclick(cb) {
      var _this = this;
      this.evetCenter.on('onclick', function () {
        for (var _len3 = arguments.length, arg = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          arg[_key3] = arguments[_key3];
        }
        cb.apply.apply(cb, [_this].concat(arg));
      });
    }
  }, {
    key: "onhover",
    value: function onhover(cb) {
      var _this2 = this;
      this.evetCenter.on('onhover', function () {
        for (var _len4 = arguments.length, arg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          arg[_key4] = arguments[_key4];
        }
        cb.apply.apply(cb, [_this2].concat(arg));
      });
    }
  }]);
  return Layer;
}();
export { Layer as default };