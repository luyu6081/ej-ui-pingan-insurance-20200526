## ej-input：输入框

可以使用Element UI `<el-input>` 的api。

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | | 控件值，用于 v-model |
| `width` | String | '552px' | 输入框宽度 |
| `number` | Boolean | false | 是否转化为数字类型（强转） |
| `debounce` | Number | 0 | 防抖间隔时间（debounce > 0） |
| `throttle` | Number | 0 | 节流间隔时间（throttle > 0） |


其余与 `<el-input>` 相同。

### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| `change` | 原生change \| 防抖 \| 节流事件 | 目前的输入值 |
