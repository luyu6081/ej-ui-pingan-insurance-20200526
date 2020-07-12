## PopoverSet 设置弹出框

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String, Number | | v-model值 |
| `title` | Object | '新常用条件名称' | 名称 |
| `number` | Boolean | false | 是否转化为数字类型（强转） |
| `clearable` | Boolean | false | 可清空 |
| `placeholder` | String | | 输入框占位文本 |
| `maxlength` | Number | | 最大输入长度 |

### Slot

| Name | Default | Description |
|---|---|---|
| default | 默认文案 | 自定义插槽内容 |

### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| `confirm` | 确定按钮事件 | (value) 输入的值 |
