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
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import Layer from "../../core/layer";
import Point from "../../core/point";
import { deepClone, styleMerge } from "../../utils";
import MarkEdit from "./edit";
var DEFAULT_STYLE = {
  color: 'red',
  size: 4,
  width: 40,
  height: 40,
  offset: [0, 0]
};
var LoadStatus = /*#__PURE__*/function (LoadStatus) {
  LoadStatus[LoadStatus["Loading"] = 0] = "Loading";
  LoadStatus[LoadStatus["Loaded"] = 1] = "Loaded";
  LoadStatus[LoadStatus["LoadError"] = 2] = "LoadError";
  return LoadStatus;
}(LoadStatus || {});
export var Mark = /*#__PURE__*/function (_Layer) {
  _inherits(Mark, _Layer);
  var _super = _createSuper(Mark);
  function Mark(start, config) {
    var _this;
    _classCallCheck(this, Mark);
    _this = _super.call(this, 'mark');
    _defineProperty(_assertThisInitialized(_this), "style", void 0);
    _defineProperty(_assertThisInitialized(_this), "_style", void 0);
    _defineProperty(_assertThisInitialized(_this), "image", void 0);
    _defineProperty(_assertThisInitialized(_this), "status", LoadStatus.Loading);
    _defineProperty(_assertThisInitialized(_this), "editLayer", void 0);
    _defineProperty(_assertThisInitialized(_this), "center", void 0);
    _this.center = start;
    _this.style = styleMerge(DEFAULT_STYLE, config);
    _this._style = styleMerge(DEFAULT_STYLE, config);
    if (_this.style.src !== undefined && _this.style.src !== '') {
      var img = new Image();
      img.src = _this.style.src;
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        _this.status = LoadStatus.Loaded;
      };
      img.onerror = function () {
        _this.status = LoadStatus.LoadError;
      };
      _this.image = img;
    }
    return _this;
  }
  _createClass(Mark, [{
    key: "onmousedown",
    value: function onmousedown(position) {
      if (!this.editLayer) return;
      this.editLayer.mousedown.call(this.editLayer, position);
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(position) {
      if (!this.editLayer) return;
      this.editLayer.mousemove.call(this.editLayer, position);
    }
  }, {
    key: "isInPath",
    value: function isInPath(p) {
      var x = p.x;
      var y = p.y;
      var _this$center$toArray = this.center.toArray(),
        _this$center$toArray2 = _slicedToArray(_this$center$toArray, 2),
        cx = _this$center$toArray2[0],
        cy = _this$center$toArray2[1];
      if (this.isEdit) {
        var _this$editLayer$isInP, _this$editLayer;
        return (_this$editLayer$isInP = (_this$editLayer = this.editLayer) === null || _this$editLayer === void 0 ? void 0 : _this$editLayer.isInPath(p)) !== null && _this$editLayer$isInP !== void 0 ? _this$editLayer$isInP : false;
      } else if (this.image) {
        var xisAllow = x >= cx - this.style.width / 2 - this.style.offset[0] && x <= cx + this.style.width / 2 + this.style.offset[0];
        var yisAllow = y >= cy - this.style.height - this.style.offset[1] && y <= cy + this.style.offset[1];
        return xisAllow && yisAllow;
      } else {
        var d = Math.sqrt(Math.pow(y - this.center.y, 2) + Math.pow(x - this.center.x, 2));
        return d < this.style.size;
      }
    }
  }, {
    key: "getPath",
    value: function getPath() {
      var _this$center$toArray3 = this.center.toArray(),
        _this$center$toArray4 = _slicedToArray(_this$center$toArray3, 2),
        x = _this$center$toArray4[0],
        y = _this$center$toArray4[1];
      return {
        type: this.type,
        path: [[Number(x.toFixed(2)), Number(y.toFixed(2))]],
        style: this.style
      };
    }
  }, {
    key: "onEdit",
    value: function onEdit() {
      this.isEdit = true;
      this.editLayer = new MarkEdit({
        center: this.center,
        image: this.image,
        style: this.style
      });
    }
  }, {
    key: "onSave",
    value: function onSave() {
      if (!this.editLayer) return;
      var _this$editLayer$save = this.editLayer.save(),
        center = _this$editLayer$save.center,
        style = _this$editLayer$save.style;
      this.style = style;
      this.center = center;
      this.isEdit = false;
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(style) {
      var _this$editLayer2;
      this.style = styleMerge(this.style, style);
      (_this$editLayer2 = this.editLayer) === null || _this$editLayer2 === void 0 || _this$editLayer2.changeStyle(this.style);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.style = deepClone(this._style);
    }
  }, {
    key: "render",
    value: function render(ctx, scale) {
      if (this.isEdit) {
        var _this$editLayer3;
        (_this$editLayer3 = this.editLayer) === null || _this$editLayer3 === void 0 || _this$editLayer3.draw(ctx);
      } else {
        if (this.image) {
          if (this.status === LoadStatus.Loading) {
            ctx.textAlign = 'center';
            ctx.fillText('loading...', this.center.x, this.center.y);
          } else if (this.status === LoadStatus.LoadError) {
            ctx.textAlign = 'center';
            ctx.fillText('资源加载失败!', this.center.x, this.center.y);
          } else {
            var dx = this.center.x - this.style.width / 2 - this.style.offset[0];
            var dy = this.center.y - this.style.height - this.style.offset[1];
            ctx.drawImage(this.image, dx,
            // image的左上角在目标canvas上 X 轴坐标。
            dy,
            // image的左上角在目标canvas上 Y 轴坐标。
            this.style.width,
            // img 在canvas 上绘制的宽度 dWidth  设置后图片将会缩放
            this.style.height // img 在canvas 上绘制的高度 dHeight
            );
          }
        } else {
          ctx.beginPath();
          ctx.fillStyle = this.style.color;
          var _this$center$getTrueP = this.center.getTruePosition(scale),
            _this$center$getTrueP2 = _slicedToArray(_this$center$getTrueP, 2),
            x = _this$center$getTrueP2[0],
            y = _this$center$getTrueP2[1];
          ctx.arc(x, y, this.style.size, 0, 2 * Math.PI);
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }, {
    key: "startEdit",
    value: function startEdit() {
      this.isEdit = true;
      this.editLayer = new MarkEdit({
        center: this.center,
        style: this.style,
        image: this.image
      });
    }
  }, {
    key: "saveEdit",
    value: function saveEdit() {
      if (this.editLayer) {
        var _this$editLayer$save2 = this.editLayer.save(),
          center = _this$editLayer$save2.center,
          style = _this$editLayer$save2.style;
        this.center = Point.clone(center);
        this.style = style;
        this.editLayer = undefined;
        this.isEdit = false;
      }
    }
  }, {
    key: "cancelEdit",
    value: function cancelEdit() {
      this.editLayer = undefined;
      this.isEdit = false;
      this.reset();
    }
  }]);
  return Mark;
}(Layer);