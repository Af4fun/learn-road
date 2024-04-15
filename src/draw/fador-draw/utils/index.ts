/** 工具类 */
// 对象合并
export const merge = (
  arg: { [k: string]: any },
  base: { [k: string]: any }
) => {
  const result = { ...base };
  Object.keys(base).forEach((k) => {
    if (arg[k] && typeof arg[k] === "object" && arg[k] != null) {
      result[k] = merge(arg[k], base[k]);
    } else if (arg[k] != undefined) {
      result[k] = arg[k];
    } else {
      result[k] = base[k];
    }
  });
  return result;
};

export const styleMerge = (defalut: object, styleConfig?: object) => {
  if (!styleConfig) return defalut;
  return merge(styleConfig, defalut);
};


/** 生成uuid */
export const genUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const windowToCanvas = (
  x: number,
  y: number,
  canvas: HTMLCanvasElement
) => {
  var box = canvas.getBoundingClientRect(); //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
  return {
    x: x - box.left - (box.width - canvas.width) / 2,
    y: y - box.top - (box.height - canvas.height) / 2,
  };
};

// 验证字符长度 处理了辅助平面的 字节长度 为 2倍情况
export const wordCount = (val: string = ""): number => {
  let count = 0;
  let i = 0;
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
export function fillRoundRect(
  cxt: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  style: {
    /*optional*/ backgroundColor: string;
    /*optional*/ borderRadius: number;
    /*optional*/ borderWidth: number;
    /*optional*/ borderColor: string;
    /*optional*/ dashed: boolean;
  }
) {
  const { borderColor, borderRadius, dashed, backgroundColor, borderWidth } =
    style;
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
function drawRoundRectPath(
  cxt: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number
) {
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
  cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

  //上边线
  cxt.lineTo(width - radius, 0);

  //右上角圆弧
  cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

  //右边线
  cxt.lineTo(width, height - radius);
  cxt.closePath();
}

export function arrayMoveMutable(
  array: Array<unknown>,
  fromIndex: number,
  toIndex: number
): void {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function arrayMoveImmutable<ValueType>(
  array: readonly ValueType[],
  fromIndex: number,
  toIndex: number
): ValueType[] {
  let t = [...array];
  arrayMoveMutable(t, fromIndex, toIndex);
  return t;
}

function isObject(obj: any) {
  // return (typeof obj === "object" || typeof obj === "function") && obj !== null;
  const str = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  console.log(str);
  return ["object", "function", "null", "array"].includes(str);
}
export function deepClone(source: any, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

  var target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 新增代码，哈希表设值

  for (var key in source) {
    if (isObject(source[key])) {
      (target as any)[key] = deepClone(source[key], hash); // 新增代码，传入哈希表
    } else {
      (target as any)[key] = source[key];
    }
  }
  return target;
}
