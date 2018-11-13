# 安装

我们需要通过 `npm` 安装 anka-cli。当然，在国内使用 `cnpm` 也是不错的选择：

```shell
$ npm install @anka-dev/cli -g
```

成功后再终端下执行 `anka`，应该能看见类似信息：

```shell
  Version: 1.0.0

  Usage:  <command> [options]

  Options:

    --debug                             enable debug mode
    --quiet                             hide compile log
    -V, --version                       output the version number
    -h, --help                          output usage information

  Commands:

    prod                                Production mode
    dev [pages...]                      Development Mode
    new-page [options] <pages...>       Create a miniprogram page
    new-cmpt [options] <components...>  Create a miniprogram component
    enroll [options] <components...>    Enroll a miniprogram component
```

# 初始化项目

成功安装 `cli` 后我们可以尝试创建一个小程序项目，这里我们把项目命名为 `anka-quickstart`：

```shell
$ anka init anka-quickstart
```

好啦。现在我们应该能在当前目录下看见 `anka-quickstart` 这个文件夹。目录结构如下:

```shell
├── dist
├── src
├── node_modules
├── anka.config.js
├── babel.config.js
├── postcss.config.js
├── package.json
└── tsconfig.json
```

`anka.config.js` 是 `anka` 的配置文件，我们可以根据自己的需求覆盖默认配置。关于具体的配置项请[查看这里](/cli/configuration.html)

另外：

- `dist`: 存放编译后的代码，当需要预览小程序时我们需要 **通过小程序开发工具** 打开这个目录（不要人为地改动这个文件夹）
- `src`: 小程序源代码目录
- `node_modules`: npm 模块存放目录
- `postcss.config.js`: postcss 配置文件

# 新增页面

进入 `anka-quickstart` 目录。并执行以下命令

```shell
$ anka new-page home
```

则在 `src/` 目录发生如下变更：

```diff
 ├── src
 │   ├── app.json
 │   ├── pages
+        └── home
+            ├── home.js
+            ├── home.json
+            ├── home.wxml
+            └── home.wxss
```

并且 `src/app.json` 的 `pages` 字段多了一行：

```diff
{
    "pages": [
+       "pages/home/home"
    ],
    "subPackages": [],
    "window": {
        "navigationBarTitleText": "Wechat"
    }
}
```

当然，我们也可以使用分包加载:

```shell
$ anka page home --root=packageA
```

与之前不一样的是 `src/app.json`:

```diff
{
    "pages": [],
    "subPackages": [
+       {
+           "root": "packageA",
+           "pages": [
+               "home/home"
+           ]
+       }
    ],
    "window": {
        "navigationBarTitleText": "Wechat"
    }
}
```

同时项目目录变化如下：

```diff
 ├── anka.config.js
 ├── src
 │   ├── app.json
+│   ├── packageA
+│   │   └── home
+│   │       ├── home.js
+│   │       ├── home.json
+│   │       ├── home.wxml
+│   │       └── home.wxss
 │   ├── project.config.json
 │   └── style
 │       ├── _var.css
 │       └── _var.scss
 └── utils
     └── index.js
```

这里新增的 `packageA` 目录是刚才 `--root` 参数所声明的分包。

# 管理组件

```shell
$ anka new-cmpt user
```

则会在 `src/components` 下创建组件：

```diff
├── src
│   ├── app.json
│   ├── components
│   │   └── user
+          ├── user.js
+          ├── user.json
+          ├── user.wxml
+          └── user.wxss
```

但是组件不会被自动注册，还需要做一件事儿将 `user` 组件添加到 `home` 页，所以我们执行这条命令:

```shell
$ anka enroll user --page=/pages/home/home
```

查看 `src/pages/home/home.json` 我们会发现：

```diff
{
    "navigationBarTitleText": "title",
    "navigationBarBackgroundColor": "#FFFFFF",
    "navigationBarTextStyle": "black",
    "usingComponents": {
+       "user": "/components/user/user"
    }
}
```

如果组件不在 `src/components` 下呢？我们可以传入完整路径:

```shell
$ anka enroll /subPackages/packageA/components/user/user --page=/subPackages/packageA/pages/index/index
```

# 调试代码

执行下面这条命令，anka 会监听文件变化并自动处理 npm 依赖，并生成源文件的 sourcemap：

```shell
$ anka dev
```

比如我们可以在 `src/pages/home/home.js` 中这样写:

```javascript
import qs from 'qs'

Page({
  onLoad() {
    qs.stringify({
      name: 'anka'
    })
  },

  onShow() {
    console.log(this, 'hello')
  }
})
```

前提是你已经安装 `qs` 依赖。必须注意的是：一些依赖 `window` 对象的代码并不能在小程序环境中正确执行，比如：`jQuery`。

# 生产模式

调试模式下生成的代码并不一定适合生产环境，所以 `anka-cli` 提供了另外一条命令：

```shell
$ anka prod
```

通过这种途径生成的代码会被压缩且不含有 sourcemap。

# 样式文件处理

Anka 默认支持 PostCSS 和 Sass。
所以，我们能将 `src/pages/home/home.wxss` 改为 `src/pages/home/home.css`，并且在里面引入其他的 css 文件。需要区别的是，这里有两种引入方式：

- `@import "./_var.css";`
- `@wximport "./sub.css";`

须知`@import` 语句必须 **前置**，其次是 `@wximport`。当使用 `@import` 时，文件会在编译时被引入，但是当使用 `@wximport` 时，文件并不会被合并，最终表现是：`@wximport` 转化为微信 `wxss` 的 `@import` 语法。

# es6和es6+

Anka 内部使用了 Babel 7，所以我们可以通过修改 `babel.config.json` 来覆盖默认配置（Babel 7+ 默认能处理 ES6 语法）。

# typescript

同上，Anka 内置了对 `TypeScript` 的支持，我们依然可以通过在 `anka-quickstart/` 目录下添加 `tsconfig.json` 覆盖默认配置。
