## 卡片

卡片组件，用插槽传入对象，悬停时，展示对象的详细信息。同时卡片增加自定义多个插槽，可扩展操作和其他展示信息

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `imgUrl` | String | | 头像信息 |
| `title` | String | | 标题 |
| `href` | String | | 标题地址 |
| `width` | Number | 272 | 卡片宽度 |

### Slot

| Name | Description |
|---|---|
| img | 悬停区 |
| action | 操作 标题右侧|
| main | 主题内容|
