## AppHeader 应用顶栏

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `height` | String \| Number | `50` | 顶栏垂直尺寸 |
| `logo` | String | | Logo 文件路径 |
| `title` | String | | 应用名称（显示在 Logo 右边） |
| `user` | Object | | 用户信息（显示在顶栏最右侧），详见下文 _user_ 部分 |
| `fixed` | Boolean | `false` | 是否固顶 |
| `options` | Object | | 顶栏配置，详见下文 _options_ 部分 |

#### `user`

用于提供用户信息数据。

| Key | Type | Description |
|---|---|---|
| `avatar` | String | 用户头像文件路径 |
| `name` | String | 用户名 |

#### `options`

用于控制顶栏各元素的显示状态。仅当属性值为 `false` 时才会隐藏。

| Key | Type | Description |
|---|---|---|
| `search` | Boolean | 是否显示搜索按钮 |
| `notification` | Boolean | 是否显示通知按钮 |
| `avatar` | Boolean | 是否显示用户头像 |
| `username` | Boolean | 是否显示用户名 |

### Slots

| Name | Description |
|---|---|
| default | 主体内容 |
| tray | 托盘区附加内容（搜索按钮左边） |

### Events

| Name | Payload | Description |
|---|---|---|
| search | keyword: String | 在用户通过搜索功能提交关键词时触发 |
