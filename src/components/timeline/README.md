## 时间线组件
可视化地呈现时间流信息，封装 Element UI <el-timeline/> <el-timeline-item/>，增加时间戳格式转换，和排序功能

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | Array | []| 数据|
| `descending` | Boolean | false| 是否倒叙排列，默认正序 |

#### `data[i]` 

| data[i] | Type | Default | Description |
|---|---|---|---|
| `timestamp` | String | | 标准的时间戳 |
| `title` | String | | 标题信息|
| `desc` | String | | 详情描述|
| `files` | Array | | 附件信息 |
| `color` | String | | 节点颜色 |

#### `files[i]` 

| files[i] | Type | Default | Description |
|---|---|---|---|
| `name` | String | | 名称 |
| `href` | String | | 下载链接|
| `size` | Number | | 文件大小, 单位(B)|
| `type` | Number | | 文件类型，可选值 1/2/3 |

