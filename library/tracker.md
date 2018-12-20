<p>
    <img src="https://user-images.githubusercontent.com/10026019/48325653-9fb60800-e671-11e8-9e5f-46e625d8159f.png" width="300"/>
    <b>&nbsp;&nbsp;&nbsp;Tracker</b>
</p>
<p>
    <a href="https://www.npmjs.com/package/@anka-dev/tracker">
        <img src="https://badge.fury.io/js/%40anka-dev%2Ftracker.svg"/>
    </a>
</p>

# 介绍

小程序打点库，用于统计用户行为数据。[Github 地址](https://github.com/iException/anka-tracker)

# 功能

anka-tracker 会将打点任务缓存到队列中，对打点任务做限流处理，避免占用太多HTTP请求导致业务逻辑请求无法顺利完成。另外，当离线或应用关闭时任务会被暂停，直到重新连线/重启后，tracker 会继续先前未完成的任务。

详细配置见 [src/types/types.d.ts](https://github.com/iException/anka-tracker/blob/dev/src/types/types.d.ts)

适用于小程序/小游戏。

# 使用

## 安装

以下两种安装方式随意选择:

- 通过 npm 安装: `$ npm install @anka-dev/tracker --save`
- 或者下载该仓库，并将 dist/anka-tracker.min.js 文件拷贝至项目内

## 初始化

anka-tracker 支持两种初始化方式：

### 方式一：使用 npm 安装

在引入 { BxTracker } 后调用 `generateTrackerInstance` 方法创建一个 tracker 实例（此时该实例未初始化）。

```javascript
const { BxTracker } = require('./anka-tracker.js')
const trackerConfig = require('[anka-tracker.config.js 文件路径]')
const tracker = BxTracker.generateTrackerInstance(trackerConfig)
```

并在恰当的时机调用 `asyncInitWithCommonData` 初始化。需要记住的是：在成功初始化之前，任何打点任务都不会被执行，这些任务会被存入队列，直到 tracker 实例被初始化。

```diff
/* app.js */
onLaunch (options) {
    this.onLaunchOption = options
    this.tracker = tracker

    wx.login({
        complete: () => {
            // 只有初始化成功后才会开始打点请求
            // demo 里我们选择登录后初始化
+           tracker.asyncInitWithCommonData({
+               // 传入 commonData，这里传入的 commonData 优先级比配置文件中的高
+               open_id: 'mock_open_id',
+               union_id: 'mock_union_id'
+           }).then(() => {
+               console.log('初始化成功，开始执行打点任务')
+           })
        }
    })
},
```

### 方式二： anka-tracker 拷贝至项目中

将 anka-tracker.min.js 和 配置文件 anka-tracker.config.js 放置在小程序的开发目录中（两者必须在同一文件夹下）

```diff
+ ├── anka-tracker.config.js
+ ├── anka-tracker.js
  ├── anka.config.json
  ├── app.js
  ├── app.json
  ├── app.wxss
  ├── dist
  │   └── index.js
  ├── pages
  │   ├── index
  │   └── log
  ├── project.config.json
  └── utils
      └── util.js
```

在 `app.js` 中引入 tracker：

```javascript
/* app.js */
const { tracker } = require('./anka-tracker.js')
```

此时已经有一个已经创建好的 tracker 实例，我们可以直接使用它。

```javascript
tracker.asyncInitWithCommonData({
    // 传入你想要的 commonData
}).then(() => {
    console.log('初始化成功，开始执行打点任务')
})
```

当然，你也可以像上面的示例一样，引入 `BxTracker` 手动初始化一个实例。

```javascript
const { BxTracker } = require('./anka-tracker.js')
const trackerConfig = require('./anka-tracker.config.js')
const tracker = BxTracker.generateTrackerInstance(trackerConfig)
```

## API

提供两个通用打点 API 供开发者使用，建议配置 `autoPageView` 使用自动打点。

```javascript
getApp().tracker.evt('click_btn', {
    page_id: this.pageId,
    custom_data: 'custom_data'
})

getApp().tracker.pv('__viewPage', {
    page_id: 'log',
    page_type: 'common',
    page_title: '详情页',
    page_level: 'tabbar_page'
})
```

值得 **注意** 的是，目前在iOS机型上，小程序 `onHide` 事件中，`setTimeout` 不会在预期的时间触发，回调函数会被冻结直到小程序触发 `onShow` 钩子。换句话说，

```javascript
setTimeout(() => {
    console.log('hello anka!')
}, 2000)
```

不会在小程序 `onHide` 触发后（`onShow` 之前）输出 `hello anka!`。

对于这样的情况，我们可以使用 `forceEvt` 方法强制执行一次打点请求。与 `evt` 不同的是，`forceEvt` 会立刻执行请求，不论成功与否均不会重试。通常情况下，不建议使用此 API。

```javascript
getApp().tracker.forceEvt('click_btn', {
    page_id: this.pageId,
    custom_data: 'custom_data'
})
```

## 配置


- `debug?: boolean`， default: `true`

    开启 log 调试

- `httpMethod?: string`， default: `POST`

    sender 发送请求是使用的 HTTP 方法

- `trackerHost?: string`， default: `''`

    数据接收接口，如果为空则不会执行打点任务

- `retry?: number`， default: `2`

    任务失败后的重试次数

- `interval?: number`， default: `1000`

    每组的时间间隔，单位 ms

- `groupMaxLength?: number`， default: `5`

    每组会包含的任务数

- `timestampKey?: string`， default: `timestamp_ms`

    添加到打点数据上的时间戳键名

- `trackIdKey?: string`， default: `__track_id`

    用于追踪每个用户的 ID 键名

- `queueMaxLength?: number`， default: `500`

    队列最大长度，超出后新的任务会被丢弃

- `commonData?: object`， default: `{}`

    可在这里指定一些 common data，每次打点任务会携带这些数据。

- `dataScheme?: object`， default: `{}`

    common data 校验规则，1 required，0 optional。下面的配置中 `user_name` 是选填项，但是 `user_id` 则不可缺少。

    ```javascript
    commonData: {
        user_id: 957,
        uesr_name: 'anka'
    },
    dataScheme: {
        user_id: 1,
        uesr_name: 0
    }
    ```

- `detectChanel?: boolean`， default: `true`

    是否检测渠道参数。渠道参数来自 `onLaunchOption.query[tracker.config.sourceSrcKey]`

- `detectAppStart?: boolean`， default: `true`

    是否捕获启动事件，小游戏上禁用

- `attachActionToUrl?: boolean`， default: `false`

    是否要把 commonData.action 添加到 trackerHost 后。如果设置为 `true`，那么在调用

    ```javascript
    /**
     * trackerHost: https://example.com/log
     */
    getApp().tracker.evt('click_btn', {
        custom_data: 'custom_data'
    })
    ```
    后，打点时会请求 `https://example.com/log/click_btn` 接口。

- `autoPageView?: (currentPage: Application, callback: (trackData: TrackData) => void) => void`，default: `undefined`

    劫持 page onShow 方法开启自动 pv 打点，小游戏上禁用

- `sourceSrcKey?: string`，default: `src`

    common data 中 source_src_key 字段值取自 onLaunch 钩子中 options.query[sourceSrcKey] 的值

- `beforeSend?: (data: TrackData) => TrackDat`， default: `undefined`

    请求发送前的自定义处理函数

具体使用方式[见示例](https://github.com/iException/anka-tracker/tree/dev/test)

# 参考

- [src/types/BxTracker.d.ts](https://github.com/iException/anka-tracker/blob/dev/src/types/BxTracker.d.ts)

- [src/types/types.d.ts](https://github.com/iException/anka-tracker/blob/dev/src/types/types.d.ts)

- [示例](https://github.com/iException/anka-tracker/blob/dev/test)
