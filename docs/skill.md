## 业务处理的一些常用

#### resource 的预下载使用

> 1 执行 ajax download 到附件流文件 <br /> 2 执行`URL.createObjectURL` 获取附件 src

#### ArrayBuffer

- 类数组对象 存储 2 进制文件流
- 类型化数组的视图或一个描述缓冲数据格式的`DataView`，使用它们来读写缓冲区中的内容.

```
    // 创建缓冲区 16字节
    var buffer = new ArrayBuffer(16);
    // 创建视图
    var unit8ClampedArray = new Unit8ClampedArray(buffer);
    // 访问视图
    for(var i = 0; i< unit8ClampedArray.length; i++){
        unit8ClampedArray[i] = i*2
    }
```

#### 跨域 canvas 污染

- 的由 XMLHttpRequest 或 Fetch 发起的跨源 HTTP 请求。
- Web 字体 (CSS 中通过 @font-face 使用跨源字体资源)，因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
- WebGL 贴图
- 使用 drawImage 将 Images/video 画面绘制到 canvas

#### 概念

**简单请求**

- 使用下列方法之一： GET HEAD POST
- 除了被用户代理自动设置的首部字段（例如 Connection ，User-Agent）和在 Fetch 规范中定义为 禁用首部名称 的其他首部，允许人为设置的字段为 Fetch 规范定义的 对 CORS 安全的首部字段集合。该集合为： Accept Accept-Language Content-Language
- Content-Type （需要注意额外的限制） Content-Type 的值仅限于下列三者之一： text/plain multipart/form-data application/x-www-form-urlencoded 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。请求中没有使用 ReadableStream 对象。 <br /> **预检请求** 顾名思义 “需要预检的请求” 首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。

#### canvas 污染

```
htmlImageElement.crossOrigin = crossOriginMode;
let crossOriginMode = htmlImageElement.crossOrigin;
// ex:
const imageUrl = "clock-demo-400px.png";
const container = document.querySelector(".container");

function loadImage(url) {
  const image = new Image(200, 200);
  image.addEventListener("load",
    () => container.prepend(image)
  );

  image.addEventListener("error", () => {
    const errMsg = document.createElement("output");
    errMsg.value = `Error loading image at ${url}`;
    container.append(errMsg);
  });

  image.crossOrigin = "anonymous";
  image.alt = "";
  image.src = url;
}

loadImage(imageUrl);

```

#### ios 下拉回弹

1. 阻止默认事件 touchmove
2. composedPath 获取冒泡路径
   > 代码如下

```
this.$refs.app.addEventListener("touchmove", (e) => {
  const needScroll = (e.path || e.composedPath()).some(
    (ele) => ele.classList && ele.classList.contains("need-scroll")
  );
  if (!needScroll) {
    e.preventDefault();
  }
});

```

#### 移动端缩放适配

vm 适配
