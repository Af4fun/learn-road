function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MenuPop = /*#__PURE__*/function () {
  function MenuPop() {
    _classCallCheck(this, MenuPop);
    _defineProperty(this, "el", void 0);
    _defineProperty(this, "poisition", void 0);
    _defineProperty(this, "isOpen", false);
    _defineProperty(this, "onDelete", void 0);
    _defineProperty(this, "onEdit", void 0);
    var el = document.createElement("div");
    this.el = el;
    el.className = "draw-menu";
  }
  _createClass(MenuPop, [{
    key: "open",
    value: function open(x, y, evt) {
      var _this = this;
      this.isOpen = true;
      this.el.innerHTML = "";
      var emaps = {
        onSave: "保存",
        onCancel: "取消",
        onEdit: "编辑图层",
        onDelete: "删除图层"
      };
      Object.keys(evt).forEach(function (e) {
        var k = e;
        var fn = evt[k];
        if (emaps[k] && fn) {
          var btn = document.createElement("div");
          btn.innerHTML = emaps[k];
          btn.className = "item";
          btn.onclick = function () {
            fn.call(_this);
            _this.close();
          };
          _this.el.appendChild(btn);
        }
      });
      this.el.style.display = "block";
      this.el.style.left = x + "px";
      this.el.style.top = y + "px";
    }
  }, {
    key: "close",
    value: function close() {
      this.el.style.display = "none";
      this.isOpen = false;
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this$el$parentNode;
      (_this$el$parentNode = this.el.parentNode) === null || _this$el$parentNode === void 0 || _this$el$parentNode.removeChild(this.el);
      this.isOpen = false;
    }
  }]);
  return MenuPop;
}();
export { MenuPop as default };