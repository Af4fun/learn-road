function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** 工具类 */
// 对象合并
export var merge = function merge(arg, base) {
  var result = _objectSpread({}, base);
  Object.keys(base).forEach(function (k) {
    if (arg[k] && _typeof(arg[k]) === "object" && arg[k] != null) {
      result[k] = merge(arg[k], base[k]);
    } else if (arg[k] != undefined) {
      result[k] = arg[k];
    } else {
      result[k] = base[k];
    }
  });
  return result;
};
export var styleMerge = function styleMerge(defalut, styleConfig) {
  if (!styleConfig) return defalut;
  return merge(styleConfig, defalut);
};

/** 生成uuid */
export var genUuid = function genUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
export var windowToCanvas = function windowToCanvas(x, y, canvas) {
  var box = canvas.getBoundingClientRect(); //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
  return {
    x: x - box.left - (box.width - canvas.width) / 2,
    y: y - box.top - (box.height - canvas.height) / 2
  };
};

// 验证字符长度 处理了辅助平面的 字节长度 为 2倍情况
export var wordCount = function wordCount() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var count = 0;
  var i = 0;
  while (i < val.length) {
    if (val[i].charCodeAt(0) >= 0x4e00) {
      count += val[i].length;
    } else count += 1;
    i++;
  }
  return count;
};

/**该方法用来绘制一个有填充色的圆角矩形
 *@param cxt:canvas的上下文环境
 *@param x:左上角x轴坐标
 *@param y:左上角y轴坐标
 *@param width:矩形的宽度
 *@param height:矩形的高度
 **/
export function fillRoundRect(cxt, x, y, width, height, style) {
  var borderColor = style.borderColor,
    borderRadius = style.borderRadius,
    dashed = style.dashed,
    backgroundColor = style.backgroundColor,
    borderWidth = style.borderWidth;
  //圆的直径必然要小于矩形的宽高
  if (2 * borderRadius > width || 2 * borderRadius > height) {
    return false;
  }
  cxt.save();
  cxt.translate(x, y);
  //绘制圆角矩形的各个边
  drawRoundRectPath(cxt, width, height, borderRadius);
  cxt.fillStyle = backgroundColor; //若是给定了值就用给定的值否则给予默认值
  dashed ? cxt.setLineDash([5]) : cxt.setLineDash([0]);
  cxt.lineWidth = borderWidth;
  cxt.strokeStyle = borderColor;
  cxt.fill();
  cxt.stroke();
  cxt.restore();
}
// 圆角矩形绘制
function drawRoundRectPath(cxt, width, height, radius) {
  cxt.beginPath();
  //从右下角顺时针绘制，弧度从0到1/2PI
  cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

  //矩形下边线
  cxt.lineTo(radius, height);

  //左下角圆弧，弧度从1/2PI到PI
  cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

  //矩形左边线
  cxt.lineTo(0, radius);

  //左上角圆弧，弧度从PI到3/2PI
  cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

  //上边线
  cxt.lineTo(width - radius, 0);

  //右上角圆弧
  cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

  //右边线
  cxt.lineTo(width, height - radius);
  cxt.closePath();
}
export function arrayMoveMutable(array, fromIndex, toIndex) {
  var startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
  if (startIndex >= 0 && startIndex < array.length) {
    var endIndex = toIndex < 0 ? array.length + toIndex : toIndex;
    var _array$splice = array.splice(fromIndex, 1),
      _array$splice2 = _slicedToArray(_array$splice, 1),
      item = _array$splice2[0];
    array.splice(endIndex, 0, item);
  }
}
export function arrayMoveImmutable(array, fromIndex, toIndex) {
  var t = _toConsumableArray(array);
  arrayMoveMutable(t, fromIndex, toIndex);
  return t;
}
function isObject(obj) {
  // return (typeof obj === "object" || typeof obj === "function") && obj !== null;
  var str = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  console.log(str);
  return ["object", "function", "null", "array"].includes(str);
}
export function deepClone(source) {
  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

  var target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 新增代码，哈希表设值

  for (var key in source) {
    if (isObject(source[key])) {
      target[key] = deepClone(source[key], hash); // 新增代码，传入哈希表
    } else {
      target[key] = source[key];
    }
  }
  return target;
}