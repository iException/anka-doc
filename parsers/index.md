# 文件解析器

Parser 是 anka-cli 的核心模块之一，用于解析不同类型的文件，使得 CLI 内的 Compilation 能正确的处理文件。

Anka-cli 内置了 `postcss-parser`、`sass-parser`、`typescript-parser`。所以对于这些类型的文件我们可以直接引入，不需要安装特定的解析器。如果有特殊需求，在项目根目录下添加对应的配置文件即可。

那么，不被识别的文件要如何处理呢？

## 编写 Parser

### 命名

每一个 npm 模块需要指定一个唯一的 name，对于 anka 的文件解析器，我们最好使用 `anka-parser-[name]` 这样的格式，便于他人识别。

### 如何处理文件

所有 Parser 模块其实都是 Function，接收 `File`、`Compilation` 实例，并在特定的时机调用 `callback` 函数以通知 `Compilation` : “我已经完工啦，你继续做其他的事儿吧”。这里我们尝试写一个解析器用于处理 sass 文件。

```javascript
import sass from 'node-sass'

export default function (file, compilation, callback) {
    const utils = this.getUtils()
    const options = this.getOptions()
    const config = this.getSystemConfig()

    file.content = file.content instanceof Buffer ? file.content.toString() : file.content

    sass.render({
        file: file.sourceFile,
        data: file.content,
        outputStyle: !config.ankaConfig.devMode ? 'nested' : 'compressed'
    }, (err, result) => {
        if (err) {
            utils.logger.error('Compile', err.message, err)
        } else {
            file.content = result.css
            file.updateExt('.wxss')
        }
        callback()
    })
}
```

通过这段代码我们可以看见解析器函数在执行时 `this` 指向被重写，同时在获得 `file` 参数后，重写了 `content` 字段，并更新文件后缀为 `.wxss`。其中:

- `getUtils` 获取我们可能需要的工具函数
- `getOptions` 获取 `anka.config.js` 中指定的 `options`
- `getSystemConfig` 获取 `Compiler` 的配置数据

需要注意的是，通过这两步后，`Compilation` 还不能能正确处理 `sass/scss` 文件。因此在使用时我们要更新项目中的 `anka.config.js`：

```diff
+ import sassParser from 'anka-parser-sass'

module.exports = {
    // ...
    parsers: [
        // ...
+       {
+           match: /.*\.(sass|scss)$/,
+           parsers: [
+               {
+                   parser: sassParser,
+                   options: {}
+               }
+           ]
+       }
    ]
}
```
如此，我们就能顺利地处理 `sass` `scss` 后缀的文件啦。
