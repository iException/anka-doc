# 插件

插件提供了更灵活的方式以控制 `Compilation` 的执行，通过注册不同的事件，我们能做到 `Parser` 无法完成的工作，我们在这里写一个插件，当处于调试模式时，给所有的 `js` 文件头部加上日期:

```javascript
export default function () {
    this.on('after-compile', function (compilation, callback) {
        const utils = this.getUtils()
        const options = this.getOptions()
        const config = this.getSystemConfig()
        const file = compilation.file

        if (config.ankaConfig.devMode && file.extname === '.js') {
            if (file.content instanceof Buffer) {
                file.content = file.content.toString()
            }

            file.content = `${new Date().toLocaleString()}\r\n${file.content}`
        }

        callback()
    }
}
```

我们可以注册的事件[见这里](../cli/how-cli-works.md)
