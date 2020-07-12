## SearchOptions 搜索条件

搜索条件组件，需引入SearchOptionsItem，SearchOptionsList，SearchOptionsCascader组件配合使用

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `max-width-tag` | String | | 已选条件组件 - 最大宽度 |
| `default-tag-more` | Boolean | true | 已选条件组件 - 否默认展开 |
| `default-expand-list` | Boolean | true | 是否展开列表 |

### Slot

| Name | Default | Description |
|---|---|---|
| `default` | | 插槽内容 |

## SearchOptionsItem 自定义条件组 

### Slot 自定义插槽组件

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | string | | 标签文本 |
| `change` | array | | 监听内容值的变化 |
| `show-more` | boolean | false | 是否默认展开 |


## SearchOptionsList 默认条件组件

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | array | | 选中value集合，用于 v-model |
| `options` | array | | 可选项数据源[{value, label, num}]形式 |
| `label` | string | | 标签文本 |
| `default-more` | boolean | false | 是否默认展开
| `no-multiple` | boolean | false | 是否单选
| `prop` | string | | 已选条件key |

## SearchOptionsCascader 条件组件-联级选择器

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | array | | 选中value集合，用于 v-model |
| `options` | array | | 可选项数据源（tree结构数据，参考el-cascader） |
| `label` | string | | 标签文本 |
| `default-more` | boolean | false | 是否默认展开
| `prop` | string | | 已选条件key |
| `...` | | | 其余属性与el-cascader相同

## SearchOptionsSelect条件组件-下拉选择器

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | array | | 选中值 |
| `options` | [array] | | 可选项数据源（tree结构数据，参考el-select）|
| `label` | string | | 标签文本 |
| `default-more` | boolean | false | 是否默认展开
| `select-props` | [object] | | 各项el-select的props值
| `prop` | string | | 已选条件key |
