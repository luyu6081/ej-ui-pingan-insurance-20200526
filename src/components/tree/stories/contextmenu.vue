<template>
  <ej-tree :data="data"
           :contextmenu="contextMenu"
           default-expand-all
           @node-click="onHandleNodeClick"
           @more-click="onHandleMoreClick"
           @command="onHandleCommand"
           style="width: 50%;" />
</template>

<script>
  export default {
    data () {
      return {
        data: [
          {
            id: '0',
            label: '北京市',
            type: 'c-government',
            children: [
              {
                id: '00001',
                label: '北京市',
                type: 'c-government',
                children: [
                  {id: '000010001', label: '朝阳区'},
                  {id: '000010002', label: '海淀区', disabled: true},
                  {id: '000010003', label: '东城区'},
                ],
              },
            ],
          },
        ],
        contextMenu: [
          {
            command: 'check',
            label: '查看',
            children: [{command: 'check-status', label: '状态'}],
          },
          {
            command: 'remove',
            label: '删除',
            children: [
              {command: 'remove-status', label: '删除状态'},
              {command: 'remove-relation', label: '删除关系'},
            ],
          },
        ],
      }
    },
    methods: {
      onHandleNodeClick ({data, node}) {
        console.log(`当前点击了${data.label}节点`)
      },
      onHandleMoreClick ({data}) {
        console.log(`${data.label}的更多操作`)
        const {type} = data
        this.contextMenu.forEach(x => {
          x.disabled = false
          x.children.forEach(c => { c.disabled = false })
        })
        if (type === 'c-government') {
          this.contextMenu.forEach(x => {
            x.disabled = true
            x.children.forEach(c => { c.disabled = true })
          })
        }
      },
      onHandleCommand ({commands, data}) {
        console.log(`当前操作为：${commands}, 节点为：${data.label}`)
      },
    },
  }
</script>
