## 用户卡片

用户卡片，用插槽传入对象，悬停时，展示对象的详细信息。

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | Object | {} | 用户对象信息 |
| `hasEmail` | Boolean | false |  |

### data

|  | Type | Default | Description |
|---|---|---|---|
| `userId` | Number |  | 用户Id|
| `name` | String | | 名称|
| `position` | String | | 职位|
| `userAvatar` | String | | 用户头像|
| `jobNumber` | Number | | 工号|
| `phoneNumber` | String | | 电话|
| `email` | String | | 邮箱|
| `department` | String | | 所属部门|
| `userAddress` | String | | 用户地址|

### EVENT
| Name | Payload | Description |
|---|---|---|
| sendMail | userId: Number | 发送用户信息，返回值用户userId |

### Slot

| Name | Description |
|---|---|
| img | 悬停区 |
