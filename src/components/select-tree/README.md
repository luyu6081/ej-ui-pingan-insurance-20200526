## 下拉框内嵌树

下拉框内嵌树，是在下拉框中以树的形式展示信息，支持单选。

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | String | | 选中值 |
| `placeholder` | String | 请选择 | 空白值提示 |
| `props` | Object | {value: 'id', label: 'organizationName', children: 'children', } | 下拉框树的props|
| `options` | Array | true | 选项列表数据(树形结构的对象数组) |
| `clearable` | Boolean | true | 有选中值后，是否可以清空选项，默认可清空 |
| `accordion` | Boolean | true | 当选中/修改值后，是否可以自动收起，默认可自动收起 |

### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| `getValue` | 选中/修改值事件触发 | 选中/修改时，返回值选中的Id |

