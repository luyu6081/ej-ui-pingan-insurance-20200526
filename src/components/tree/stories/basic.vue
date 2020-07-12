<template>
  <ej-tree :data="data"
            collapse-icon="classic"
            show-line
            :default-expanded-ids="['0','00001']"
            @node-click="onHandleNodeClick"
            ref="tree" />
</template>

<script>
  export default {
    data () {
      return {
        data: [
          {
            id: '-1',
            label: '我的文档',
            iconClass: 'folder',
            children: [
              {
                id: '0',
                label: '照片',
                iconClass: 'folder',
                children: [
                  {id: '00001', label: '朋友', iconClass: 'file'},
                  {id: '00002', label: '同事', iconClass: 'file'},
                ],
              },
              {
                id: '1',
                label: '文档',
                iconClass: 'folder',
                children: [
                  {id: '10001', label: 'intel', iconClass: 'file'},
                  {id: '10002', label: '游戏', iconClass: 'file'},
                ],
              },
              {id: '2', label: 'index', iconClass: 'file'},
              {id: '3', label: 'about', iconClass: 'file'},
            ],
          },
        ],
      }
    },
    methods: {
      onHandleNodeClick ({data, node}) {
        console.log(`当前点击了${data.label}节点`)
      },
    },
    mounted () {
      this.$refs['tree'].setCurrentNode(this.data[0].children[0])
      let currentNode = this.$refs['tree'].getCurrentTreeData()
      console.log(currentNode)
    },
  }
</script>

<style lang="scss">
  .ej-tree {
    .folder,
    .file {
      border-radius: 50%;
      box-sizing: border-box;
    }

    .folder {
      background-color: wheat;
    }

    .file {
      background-color: lightskyblue;
    }
  }
</style>
