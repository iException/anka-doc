# SUIT CSS

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](http://gitter.im/suitcss/suit)

基于组件UI开发的样式工具

SUIT CSS为基于组件的Web应用程序开发提供了可靠且可测试的样式解决方案。 该项目包括：

* [CSS基础样式](https://github.com/suitcss/base) for web apps.
* [CSS工具类](https://github.com/suitcss/utils).
* [CSS组件](https://github.com/suitcss/components).
* [未来需要面对的css预处理器](https://github.com/suitcss/preprocessor)

每个模块都由较小的模块组成，可以轻松定制您需要的样式组件。

原文：

Style tools for component-based UI development.

SUIT CSS provides a reliable and testable styling solution for component-based
web application development. The project includes:

* [CSS base styles](https://github.com/suitcss/base) for web apps.
* [CSS utilities](https://github.com/suitcss/utils).
* [CSS components](https://github.com/suitcss/components).
* A [future-facing CSS preprocessor](https://github.com/suitcss/preprocessor)

Each of these modules are made up of smaller modules, making it easy to customize
your setup and build pipeline.

**[文档](doc/README.md)**.

## 快速上手 （Quick start）

使用npm安装SUIT包和一些预处理器

Install the SUIT package and preprocessor with npm:

```
npm install suitcss --save
npm install suitcss-preprocessor --save-dev
```

创建一个将导入SUIT包的`index.css`。 添加自定义媒体查询的值以及您要覆盖的任何自定义属性：

原文：Create an `index.css` that will import the SUIT packages. Add values for the
custom media queries and any custom properties that you wish to override:

```css
@import "suitcss";

@custom-media --sm-viewport (min-width: 320px) and (max-width: 640px);
@custom-media --md-viewport (min-width: 640px) and (max-width: 960px);
@custom-media --lg-viewport (min-width: 960px);

:root {
  --Grid-gutterSize: 25px;
}
```

软件包也可以独立安装，以实现更模块化的构建：

原文：Packages can also be installed independently for a more modular build:

```
npm install suitcss-utils-size suitcss-components-grid --save
```

```css
@import "suitcss-components-grid";
@import "suitcss-utils-size";
```

在`package.json`中的`scripts`对象中添加一个条目来运行预处理器：

原文：Add an entry to the `scripts` object in `package.json` that will run the
preprocessor:

```json
"scripts": {
  "build": "suitcss index.css build/build.css"
}
```

现在在命令行上运行`npm run build`，将构建的包输出到`build / build.css`。 预处理器还可以通过传递`-w`标志来监视文件更改，例如 `npm run build  --  -w`。

更多实例请参考[SUIT theme](https://github.com/suitcss/theme)

原文：

Now run `npm run build` on the command line to output the built packages to
`build/build.css`. The preprocessor can also watch for file changes by passing
the `-w` flag e.g. `npm run build -- -w`.

Refer to the [SUIT theme](https://github.com/suitcss/theme) for a more thorough
example.

## 社区相关包 （Community Packages）

### 组件 （Components）

* https://github.com/antontrollback/select
* https://github.com/giuseppeg/suitcss-toolkit
* https://github.com/simonsmith/suitcss-components-form-field

### 工具类 （Utilities）

* https://github.com/frekyll/suitcss-utils-spacing
* https://github.com/simonsmith/suitcss-utils-image
* https://github.com/simonsmith/suitcss-utils-list

## 例子 （Example）

SUIT CSS利用CSS的可变性，自定义媒体查询和依赖项解析。

SUIT CSS makes use of variables, custom media queries, and dependency resolution for CSS.

HTML:

```html
<article class="Excerpt u-cf">
  <img class="Excerpt-thumbnail u-sizeFit" src="{{src}}" alt="">
  <div class="u-sizeFill">
    <h1 class="Excerpt-title"><a href="{{url}}">{{title}}</a></h1>
    <p class="Excerpt-text u-textBreak">{{description}}</p>
    <span class="Excerpt-readMore">
      <!-- BUTTON COMPONENT -->
    </span>
  </div>
</article>
```

CSS:

```css
/** @define Excerpt */

@import "suitcss-utils-layout";
@import "suitcss-utils-size";
@import "suitcss-utils-text";
@import "./Button";

/**
 * Content excerpts. Agnostic of image size, and with a clear call to action.
 */

:root {
  --Excerpt-padding: 20px;
  --Excerpt-highlightColor: orange;
}

.Excerpt {
  padding: var(--Excerpt-padding);
}

.Excerpt-thumbnail {
  border: 2px solid var(--Excerpt-highlightColor);
  border-radius: 3px;
  margin-right: 10px;
}

.Excerpt-title {
  border-bottom: 1px solid #ccc;
  margin: 0 0 15px;
  padding-bottom: 5px;
}

.Excerpt-readMore {
  display: inline-block;
  margin-top: 10px;
}
```

## CSS包 （CSS packages）

每个CSS包都可以用npm安装。建议您在需要时依赖单个软件包，但是，如果您愿意，可以一次安装所有CSS包：

* [npm](https://www.npmjs.org/): `npm install suitcss`

每个包都是独立的，包含自己的文档和测试，并且都遵循一套共同的[命名规范](doc/naming-conventions.md)

* [base](https://github.com/suitcss/base/)：基于normalize.css构建的网络应用程序的精简重置。
* [utils](https://github.com/suitcss/utils/)：所有工具包。
* [components-arrange](https://github.com/suitcss/components-arrange/)：类似flexbox的水平排列。
* [components-button](https://github.com/suitcss/components-button/)：强大的结构按钮样式。
* [components-flex-embed](https://github.com/suitcss/components-flex-embed/)：嵌入的宽高比。
* [components-grid](https://github.com/suitcss/components-grid/)：栅格基础。
* [components-test](https://github.com/suitcss/components-test/)：视觉测试。
* [主题](https://github.com/suitcss/theme/)：主题示例。

您还可以下载预先构建的软件包，以便在不设置构建程序的情况下进行尝试

* [base bundle](https://github.com/suitcss/base/releases)
* [utils bundle](https://github.com/suitcss/utils/releases)
* [components bundle](https://github.com/suitcss/components/releases)
* [everything bundle](https://github.com/suitcss/suit/releases) (最小4kb)

原文：

Each CSS package can be installed with npm.
It's suggested that you depend on individual packages as and when you need
them, however, you can install all the CSS packages at once if you prefer:

* [npm](https://www.npmjs.org/): `npm install suitcss`

Each package is stand-alone, contains its own documentation and tests, and is
written to follow a common set of [naming conventions](doc/naming-conventions.md).

* [base](https://github.com/suitcss/base/): a thin reset for web apps, built on top of normalize.css.
* [utils](https://github.com/suitcss/utils/): all the utility packages.
* [components-arrange](https://github.com/suitcss/components-arrange/): flexbox-like horizontal arrangements.
* [components-button](https://github.com/suitcss/components-button/): robust, structural button styles.
* [components-flex-embed](https://github.com/suitcss/components-flex-embed/): aspect-ratios for embeds.
* [components-grid](https://github.com/suitcss/components-grid/): a grid foundation.
* [components-test](https://github.com/suitcss/components-test/): structure for visual tests.
* [theme](https://github.com/suitcss/theme/): example theme.

You can also download pre-built bundles to try things out without setting up a
build process:

* [base bundle](https://github.com/suitcss/base/releases)
* [utils bundle](https://github.com/suitcss/utils/releases)
* [components bundle](https://github.com/suitcss/components/releases)
* [everything bundle](https://github.com/suitcss/suit/releases) (only 4.4KB minified and gzipped)

## 构建和测试工具 （Build and test tools）

[suitcss-preprocessor](https://github.com/suitcss/preprocessor)通过构建管道来运行CSS。它允许每个测试文件来保证你的代码符合
SUIT CSS命名约定，提供压缩并允许引入PostCSS。可获取到CLI和Node API

预处理器的使用：

* [PostCSS](https://github.com/postcss/postcss)：转换css的js插件
   * [postcss-import](https://github.com/postcss/postcss-import)
   * [postcss-custom-properties](https://github.com/postcss/po)tcss-custom-properties)
   * [postcss-calc](https://github.com/postcss/postcss-calc)
   * [postcss-custom-media](https://github.com/postcss/postcss-custom-media)
   * [autoprefixer](https://github.com/postcss/autoprefixer)

原文：

The [suitcss-preprocessor](https://github.com/suitcss/preprocessor) runs CSS
through a build pipeline. It performs per-file tests for conformance to the
SUIT CSS naming conventions, offers minification and allows additional PostCSS
plugins to be added. A CLI and Node API are available

The preprocessor makes use of:

* [PostCSS](https://github.com/postcss/postcss): A tool for transforming styles with JS plugins
  * [postcss-import](https://github.com/postcss/postcss-import)
  * [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)
  * [postcss-calc](https://github.com/postcss/postcss-calc)
  * [postcss-custom-media](https://github.com/postcss/postcss-custom-media)
  * [autoprefixer](https://github.com/postcss/autoprefixer)

Packages are linted with [postcss-bem-linter](https://github.com/postcss/postcss-bem-linter) and minification is provided by [cssnano](http://cssnano.co/).

## 补充工具和常见库 （Complementary tools and libraries）

基于组件开发的库/框架：

原文：Libraries / frameworks for component-based development:

* [React](https://facebook.github.io/react/)
* [Ember.js Components](http://emberjs.com/guides/components/)
* [AngularJS](https://github.com/angular/angular.js)

工具和依赖管理器

原文：Tools and dependency managers:

* [npm](https://www.npmjs.org/): package manager.
* [html-inspector](https://github.com/philipwalton/html-inspector): test HTML templates for SUIT CSS conformance.

## 发展（Development）

安装[Node](http://nodejs.org)，并运行如下代码：

原文：Install [Node](http://nodejs.org) (comes with npm).To generate a build:

```
npm run build
```

## 浏览器兼容性 （Browser support）

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+ (28+ for `flex`)
* Safari 5+ (6.1+ for `flex`)
* Internet Explorer 9+ (10+ for `flex`)

Refer to the [caniuse](http://caniuse.com/) page for [flexbox](http://caniuse.com/#feat=flexbox).
