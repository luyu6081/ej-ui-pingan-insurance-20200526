## v-ej-scrollbar 滚动条

对perfect-scrollbar的二次封装。

```html
<!-- 普通用法 -->
<div v-ej-scrollbar>...</div>

<!-- 加入参数和自定义事件 -->
<div v-ej-scrollbar:options="{minScrollbarLength: 10, swipeEasing: false}" @ps-scroll-y="handlePsScrollY">...</div>
```
### Props
参考perfect-scrollbar的Options
### Events
参考perfect-scrollbar的Events

###### 注意
`工作不友好：iframe | body | textarea`
`不支持：滚动锚定`