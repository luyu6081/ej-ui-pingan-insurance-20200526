## 纯文本编辑器

其实也谈不上什么「编辑器」了，就是个输入框而已……

通过封装 Element UI `<el-input type="textarea">` 实现。考虑到以后可能的改造需求，没有暴露太多 props，目前只有 `placeholder` 和 `rows`。其中 `rows` 除 Number 外也接受数字形式的 String，内部会做格式转换。

输入内容通过 `v-model` 传递，值类型为 String。

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `placeholder` | String | | 占位提示文本 |
| `rows` | Number \| String | | 输入框高度，以行为单位 |

### Events

与 `<el-input>` 相同。
