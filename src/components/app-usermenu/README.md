## app-usermenu 用户菜单组件

用户菜单组件，需传入user，endpoint参数，以点击后弹出菜单展示

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `user` | Object | | 配置项 {avatar(头像)，name(中文名称)，tenantName(租户名称)} |
| `endpoint` | Object | | 配置项 {avatarUrl(获取头像接口:http://auth-frontier.dev.jinxin.cloud/filesUpload)、loginUrl(登录地址:http://login.dev.jinxin.cloud/)
client(自定义client配置:调用auth-frontier中的退出接口,如'ucClient')、logoutUrl(退出地址) |

### Property

| Name | Default | Description |
|---|---|---|
| no-uc | Boolean | 默认为false(显示'个人中心'项) |


### Slot

| Name | Default | Description |
|---|---|---|
| menu-slot | | 插槽内容(<a>***</a>) |

### Methods

| 方法名 | 说明 | 参数 |
|---|---|---|
| `logout` | 退出当前系统 | Function() |

### 跳转至“个人中心”项目

| Name | Default | Description |
|---|---|---|
| jinxin.cloud | | 金信环境dev，demo |
| 客户 | | 客户环境:待完善逻辑 |
