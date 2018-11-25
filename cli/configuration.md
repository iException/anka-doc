# Anka 配置

AnkaCLI 的默认配置如下所示。如果需要自定义配置，则在项目根目录下添加 `anka.config.js` 或 `anka.config.json` 文件。

```javascript
/* anka.config.js */
module.exports = {
    "components": "./components",
    "pages": "./pages"
}
```

## 详细配置:

```typescript
/*****************************************************
 *                   Danger zone
 *****************************************************/

/**
 * The path where WeChat miniprogram source files exist.
 * @default './src'
 */
export const sourceDir = './src'

/**
 * The path where WeChat miniprogram compiled files exist.
 * @default './dist'
 */
export const outputDir = './dist'

/**
 * The path where WeChat miniprogram pages exist.
 * @default './src/pages'
 */
export const pages = './pages'

/**
 * The path where WeChat miniprogram components exist.
 * @default './src/components'
 */
export const components = './components'

/**
 * Template for creating page and component.
 */
export const template = {
    page: path.join(__dirname, '../template/page'),
    component: path.join(__dirname, '../template/component')
}

/**
 * The path where WeChat miniprogram subpackages exist.
 * @default './src/subPackages'
 */
export const subPackages = './subPackages'

/*****************************************************
 *                 Custom configure
 *****************************************************/

/**
 * Whether to output compile information.
 * @default false
 */
export const quiet = false

/**
 * Anka development mode.
 * @default false
 */
export const devMode = false

/**
 * Register file parser.
 */
export const parsers: ParsersConfigration = [
    {
        match: /.*\.(js|es)$/,
        parsers: [
            {
                parser: babelParser,
                options: {}
            }
        ]
    },
    {
        match: /.*\.(wxss|css|postcss)$/,
        parsers: [
            {
                parser: styleParser,
                options: {}
            }
        ]
    },
    {
        match: /.*\.(sass|scss)$/,
        parsers: [
            {
                parser: sassParser,
                options: {}
            }
        ]
    },
    {
        match: /.*\.(ts|typescript)$/,
        parsers: [
            {
                parser: typescriptParser,
                options: {}
            }
        ]
    }
]

/**
 * Whether to output debug information.
 * @default false
 */
export const debug: boolean = false

/**
 * Register plugin.
 */
export const plugins: PluginsConfigration = [
    {
        plugin: extractDependencyPlugin,
        options: {}
    },
    {
        plugin: saveFilePlugin,
        options: {}
    }
]

/**
 * Files that will be ignored in compilation.
 */
export const ignored: IgnoredConfigration = []

/*****************************************************
 *               experimental configure
 *****************************************************/
```
