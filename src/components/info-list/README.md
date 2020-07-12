## 信息列表

信息列表，以name,value的形式展示信息，支持多列，横排/竖排。

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | Array | | 数据列表 |
| `columns` | Number | 1 | 分栏数量 |
| `isVertical` | Boolean | false | 是否竖排排列，默认横排 |

#### data[i] 

| data[i]  | Type | Default | Description |
|---|---|---|---|
| `name` | String | | 左侧描述 |
| `value` | String | | 右侧信息 |
| `slotName` | String | | 可选，自定义slot |

### Slot

| Name | Description |
|---|---|
| item | 统一自定义右侧value,支持slot-scope |
| {slotName} | 自定义插槽，自定义单个value,支持slot-scope |

