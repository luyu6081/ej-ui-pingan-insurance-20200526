<template>
  <ej-tree :data="data"
           :contextmenu="contextMenu"
            default-expand-all
            show-line
            collapse-icon="classic"
            class="dynamic-tree"
            @node-click="onNodeClick"
            @more-click="onMoreClick"
            @command="onCommand">
    <template #default="{node, data}">
      <span class="node-label">
        {{ data.label }}<span class="node-label__subLabel" v-if="data.subLabel">({{ data.subLabel }})</span>
      </span>
    </template>
    <template #morePrefix="{ node, data }">
      <span class="node-operate">查看详情</span>
    </template>
  </ej-tree>
</template>

<script>
  export default {
    data () {
      return {
        data: [
          {
            id: '0',
            label: '北京市',
            subLabel: '首都',
            children: [
              {
                id: '00001',
                label: '北京市',
                subLabel: '直辖市',
                children: [
                  {id: '000010001', label: '朝阳区', subLabel: '主城区'},
                  {id: '000010002', label: '海淀区', disabled: true},
                  {id: '000010003', label: '东城区'},
                ],
              },
            ],
          },
          {
            id: '1',
            label: '天津市',
            type: 'c-government',
            children: [
              {
                id: '00001',
                label: '北京市',
                subLabel: '直辖市',
                children: [
                  {id: '000010001', label: '朝阳区', subLabel: '主城区'},
                  {id: '000010002', label: '海淀区', disabled: true},
                  {id: '000010003', label: '东城区'},
                ],
              },
            ],
          },
        ],
        contextMenu: [
          {command: 'check', label: '查看'},
          {command: 'remove', label: '删除'},
        ],
      }
    },
    methods: {
      onNodeClick ({data, node}) {
        console.log(`当前点击的节点为${data.label}`)
      },
      onMoreClick ({data}) {
        console.log(`${data.label}的更多操作列表`)
      },
      onCommand ({commands, data}) {
        console.log(`${data.label}的当前操作是： ${commands}`)
      },
    },
  }
</script>

<style lang="scss">
  .dynamic-tree {
    .node-label {
      &__subLabel {
        @apply inline-block;

        margin-left: 10px;
        font-size: 12px;
        color: #ccc;
        line-height: 12px;
        height: 12px;
      }
    }
  }
</style>
