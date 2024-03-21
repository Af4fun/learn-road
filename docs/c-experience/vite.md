---
title: 使用vite进行npm包构建
group:
  title: 经验
---

### CommonJs, ESM, UMD

模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

**IIFE**： 使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。

```js
(function () {
  return { data: [] };
})();
```

**AMD**： 使用 requireJS 来编写模块化，特点：依赖必须提前声明好。

```js
define('./index.js',function(code){ // code 就是 index.js 返回的内容 })
```

**CMD**： 使用 seaJS 来编写模块化，特点：支持动态引入依赖文件。

```js
define(function (require, exports, module) {
  var indexCode = require('./index.js');
});
```

**CommonJS**： nodejs 中自带的模块化。

`var fs = require('fs');`

**UMD**：兼容 AMD，CommonJS 模块化语法。

webpack(require.ensure)：webpack 2.x 版本中的代码分割。

**ES** Modules： ES6 引入的模块化，支持 import 来引入另一个 js 。

`import a from 'a';`

## Vite Typescript Vue npm 包的构建

1. 初始化 vue 项目 模板选择 vue-ts

```shell
 yarn create vite package-name --template vue-ts

```

2. 修改 vite 配置为库模式

```js
{
    plugins: [
    vue(),

    //添加jsx/tsx支持
    vueJsx({}),

    //解决引入commonjs模块后打包出现的{'default' is not exported by XXX}错误!!
    commonjs({ requireReturnsDefault: true }),  /* 配置requireReturnsDefault属性，
    解决打包后引入VForm出现的"Axios is not a constructor"错！！ */

    //可视化Bundle
    visualizer(),

    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),

  ],

resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.vue', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },

  optimizeDeps: {
    include: [],
  },

  css: {
    preprocessorOptions: {
      scss: {
        /* 自动引入全局scss文件 */
        additionalData: '@import "./src/styles/global.scss";'
      }
    }
  },


build: {
    //minify: false,
    lib: {
      entry: resolve(__dirname, 'main.js'),
      name: 'lib',
      fileName: (format) => `${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus'],
      output: {
        //要支持CDN引入必须设置此参数！！！
        exports: 'default',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
        assetFileNames: `style.css`
      }
    }
  }
}

```

3. packgeJson 进行配置

```json
    "private": true,
    "version": "0.0.1",
    "type": "module",
    "types": "./types/index.d.ts",
    "files": [
        "dist",
        "types"
    ],
    "main": "./dist/lib.umd.cjs",
    "module": "./dist/lib.js",
    "exports": {
        ".": {
        "import": "./dist/lib.js",
        "require": "./dist/lib.umd.cjs"
        }
    },


```
