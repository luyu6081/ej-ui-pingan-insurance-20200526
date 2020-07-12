## IDE 面板页签。功能如下
    1. 展示所有页签，
    2. 可标识激活的页签。
    3. 超出容器自动换行，
    4. 可进行移除
    5. 不可关闭型标签
    6. 页签图标
    7. 双击页签可重命名（定制有无）
    8. 页签栏自定义内容区域
    9. 添加标签（定制有无）
 
### v-model: number
    活跃页签的序号
    
### Props
 | Prop | Type | Default | Description |
 | :----: | :----: | :----: | --- |
 | `tabs` | Array | [] | 页签集合 |
 | `show-create` | Boolean | false | 是否需要创建标签功能 |
 | `renamable` 或 `renameable` | Boolean | false | 是否允许重命名页签（`renameable` 是别名，效用优先级次于 `renamable`） |
 | `self-close` | Boolean | false | 关闭工作区，外部是否调用自定义ui层 |
 | `right-click` | Boolean | false | 是否开启右击功能，包含关闭所有、关闭其他、固定 |
 
#### `tabs[0]`
| prop |Type | Default | Description |
| :----: | :----: | :----: | --- |
| `name` | String |  | 页签名字 |   
| `icon` | String |  | 页签图标名字（svg） |   
| `closable` | Boolean | false | 可关闭性（默认可关闭，显式为 false 时不可关闭） |   
| `affix` | Boolean |  | 固定状态（显示不固定，显式为 true 时固定） |   

### Events
| Name | Payload | Description |
|---|---|---|
| `change-tab` | tab: Object, idx: Number | 切换页签时触发，携带新活跃页签的数据和序号 |
| `close-tab` | tab: Object, idx: Number | `即将废弃,0.5.x之将不再支持`关闭页签时触发，携带被关闭页签的数据和序号 |
| `close-tabs` | tabs:Array | 关闭页签时触发，携带被关闭页签的集合 |
| `affix-tab` | tab: Object, idx: Number | 固定页签时触发，携带页签的数据和序号 |
| `rename-tab` | tab: Object, idx: Number | 重命名页签时触发，携带被重命名页签的数据和序号，处理函数同步或异步返回`false` 时中止重命名过程 |
| `create-tab` |  | 创建标签时触发 |

### Slots
| name | Payload |说明 |
|:----: | ---| --- |
| `default` | tab: Tab, idx: Number | 主体区域，传递页签的数据和序号 |
| `tabbar-left` | | 页签栏左侧区域 |
| `tabbar-right` | | 页签栏右侧区域 |
