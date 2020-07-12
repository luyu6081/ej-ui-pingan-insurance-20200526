## 任务流程

任务流程组件，可完整的展示一个操作流程，流程操作中包含四种状态，未进行、进行中、已完成、驳回。悬停每个流程，显示具体操作信息。操作，支持给具体流程负责人发站内信，可以对等待的流程节点负责人进行催促

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | Array | | 流程数据 |

#### `data[i]`

| data[i] | Type | Default | Description |
|---|---|---|---|
| `title` | String | | 流程标题 |
| `type` | Number | | 状态，可取值 1/2/3/4 |
| `tasks` | Array | | 操作人信息 ，可选|

#### `tasks[i]`

| tasks[i] | Type | Default | Description |
|---|---|---|---|
| `user_id` | String | | 用户id |
| `user_name` | String | | 用户名 |
| `user_img` | String | | 用户头像 |
| `timestamp` | String | | 操作时间 |


### Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| nag | 催一下 | data[i]|
