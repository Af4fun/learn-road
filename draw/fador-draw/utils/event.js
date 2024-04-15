function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EventCenter = /*#__PURE__*/function () {
  function EventCenter() {
    _classCallCheck(this, EventCenter);
    _defineProperty(this, "funcList", []);
  }
  _createClass(EventCenter, [{
    key: "on",
    value: function on(name, fc) {
      var target = this.funcList.findIndex(function (v) {
        return v.name === name;
      });
      if (target > -1) {
        this.funcList.splice(target, 1);
      }
      this.funcList.push({
        name: name,
        fc: fc
      });
    }
    // 派发事件
  }, {
    key: "emit",
    value: function emit(name, arg) {
      var target = this.funcList.find(function (v) {
        return v.name === name;
      });
      target && target.fc.call(this, arg);
    }
  }, {
    key: "off",
    value: function off(name) {
      this.funcList = this.funcList.filter(function (v) {
        return v.name !== name;
      });
    }
  }]);
  return EventCenter;
}();
export { EventCenter as default };