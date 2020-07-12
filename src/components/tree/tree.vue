<template>
  <el-tree ref="tree"
           :class="[ 'ej-tree', `${collapseIcon}`, { 'line': showLine } ]"
           :data="data"
           :props="{ label: 'label', children: 'children' }"
           :default-expand-all="defaultExpandAll"
           :filter-node-method="onFilteronNode"
           :expand-on-click-node="expandOnClickNode"
           :default-expanded-keys="defaultExpandedIds"
           node-key="id"
           @node-click="onNodeClick">
    <template #default="{ node, data }">
      <div :class="[ 'el-tree-node', { 'is-leaf': node.isLeaf } ]">
        <!-- {{node.isLeaf}}{{node.expanded}} -->
        <i v-if="data.iconClass" :class="[ 'el-tree-node__icon', data.iconClass ]"></i>
        <div class="el-tree-node__label">
          <slot :node="node" :data="data">{{ data.label }}</slot>
        </div>
        <div class="el-tree-node__more">
          <slot name="morePrefix" :node="node" :data="data"></slot>
          <el-dropdown v-if="showContextmenu"
                       trigger="click"
                       class="tree-dropdown">
            <div :class="['more-icon', { 'is-selected': dropMenuItem.id === data.id }]"
                 @click.stop="handleMoreClick(data)"/>
            <el-dropdown-menu slot="dropdown" ref="dropdown">
              <ej-tree-contextmenu v-for="(item, index) in contextmenu"
                                   :key="index"
                                   :menu="item"
                                   :level="0"
                                   :commands="commands"
                                   :commandTrigger="commandTrigger"
                                   @command="onCommand"
                                   @change="onChange"
                                   @commandTriggerChange="commandTriggerChange"></ej-tree-contextmenu>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
  </el-tree>
</template>

<script>
  import {
    Tree as ElTree,
    Dropdown as ElDropdown,
    DropdownMenu as ElDropdownMenu,
  } from 'element-ui'

  import EjTreeContextmenu from './contextmenu'

  export default {
    name: 'EjTree',

    inheritAttrs: false,

    components: {
      ElTree,
      ElDropdown,
      EjTreeContextmenu,
      ElDropdownMenu,
    },

    props: {
      // 展开按钮类型
      collapseIcon: {
        type: String,
        default: 'caret',
      },

      // 数据源
      data: {
        type: Array,
        default: () => ({}),
      },

      // 过滤方法
      filter: Function,

      // 是否默认展开所有节点
      defaultExpandAll: Boolean,

      // 默认展开的节点的 id 的数组
      defaultExpandedIds: {
        type: Array,
        default: () => ([]),
      },

      // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false 收缩节点。
      expandOnClickNode: {
        type: Boolean,
        default: false,
      },

      // 更多操作列表数据源
      contextmenu: {
        type: Array,
        default: () => ([]),
      },

      // 是否显示折叠线
      showLine: Boolean,
    },

    computed: {
      commandsString () {
        return this.$commands.join('')
      },
      tree () {
        return this.$refs['tree']
      },
      showContextmenu () {
        return this.contextmenu.length > 0
      },
    },

    data () {
      return {
        commandTrigger: 0,
        commands: [],
        keywords: null,
        currentNode: null,
        dropMenuItem: {},
        command: [],
      }
    },

    methods: {
      onChange ({index, command}) {
        this.commands.splice(index, this.commands.length - index, command)
      },
      onClearCommand () {
        this.commands = []
      },
      onNodeClick (data, node) {
        this.dropMenuItem = {}
        this.currentNode = data
        this.$emit('node-click', {data, node})
      },
      onFilteronNode (value, data) {
        return this.filter({value, data})
      },
      handleMoreClick (data) {
        this.onChange({index: 0, command: undefined})
        this.dropMenuItem = data
        this.$emit('more-click', {data})
      },
      onCommand () {
        this.$emit('command', {commands: Array.from(this.commands), data: this.dropMenuItem})
        this.onClearCommand()
      },
      setCurrentNode (node) {
        this.currentNode = node
        this.tree.setCurrentNode(node)
      },
      getCurrentTreeData () {
        return this.currentNode
      },
      commandTriggerChange (val) {
        this.commandTrigger = val
      },
    },
    watch: {
      commandTrigger (newVal) {
        if (this.commands.length) {
          this.onCommand()
        }
      },
    },
  }
</script>

<style lang="scss">
  $icon-width: 12px;
  $margin-right: 10px;
  $text-padding: 4px;
  $children-padding: 26px; // $icon-width + margin-right + text-padding
  $content-padding-left: 16px; // 12/2 + 10
  $leaf-line-left: -16px; // 12/2 + 10

  .ej-tree {
    @apply bg-white;

    &.classic {
      .el-tree-node {
        &__content {
          & > .el-tree-node__expand-icon {
            @apply bg-no-repeat bg-center bg-contain;

            margin-right: $margin-right;
            padding: 0;
            transform: none;
            transition: none;
            margin-left: $text-padding;
            width: $icon-width;
            height: $icon-width;
            background-image: url('./stories/assets/extend.svg');

            &.expanded {
              background-image: url('./stories/assets/narrow.svg');
            }

            &.is-leaf {
              background-image: none;
            }

            &:before {
              content: ' ';
            }
          }
        }
      }
    }

    &.line {
      .el-tree-node {

        &__children {
          border-left: 1px dashed #bbb;

          >.el-tree-node {

            &:last-of-type {
              @apply relative;

              >.el-tree-node__content {
                >.el-tree-node {
                  &.is-leaf {
                    &::before {
                      height: calc(50% + 4px);
                    }
                  }
                }
              }
            }
          }
        }

        &.is-leaf {
          @apply relative;

          margin-left: $children-padding;

          &::before,
          &::after {
            @apply absolute;

            content: '';
            left: $leaf-line-left;
          }

          &:before { // |
            top: -4px;
            height: calc(100% + 8px);
            width: 0;
            border-left: 1px dashed #bbb;
          }

          &::after { // -
            top: 50%;
            height: 0;
            width: $margin-right;
            border-top: 1px dashed #bbb;
          }
        }
      }

      >.el-tree-node {
        >.el-tree-node__children {
          border-left: none;
        }
      }
    }

    .el-tree-node {
      @apply flex-1 flex-row align-middle;
      margin: 4px 0;

      .ej-icon {
        width: $icon-width;
        height: $icon-width;
        margin: 0;
        padding: 0;
        margin-right: $margin-right;
      }

      >.el-tree-node__children {
        margin-left: $margin-right;
      }

      &.is-current {
        >.el-tree-node {
          &__content {
            .el-tree-node__label {
              @apply text-gray-darkest;

              background-color: #d4e4ff;
            }
          }
        }
      }

      &:focus {
        &>.el-tree-node__content {
          @apply bg-transparent;
        }
      }

      &__content {
        @apply text-gray-darker flex-row flex-1 flex;

        line-height: 22px;
        height: auto;

        // 鼠标悬停样式
        &:hover {
          @apply bg-transparent text-blue;

          .more-icon {
            @apply visible;
          }
        }

        .el-tree-node__expand-icon {
          &.is-leaf {
            display: none;
          }
        }
      }

      &__children {
        >.el-tree-node {

          >.el-tree-node {
            &__content {
              padding-left: $content-padding-left !important;
            }

            &__children {
              margin-left: $children-padding;
            }
          }
        }
      }

      .ej-icon,
      &__icon,
      &__label,
      &__more {
        @apply inline-block align-middle;
      }

      &__icon {
        width: $icon-width;
        height: $icon-width;
        margin-right: 6px;
        margin-left: $text-padding;
      }

      &__label {
        padding: 0 $text-padding;
        font-size: 14px;
      }

      // 更多按钮
      &__more {
        @apply relative float-right;

        margin-right: $margin-right;

        >div,
        >span {
          @apply inline-block align-middle;

          margin: 0 5px;
        }

        .more-icon {
          @apply bg-no-repeat bg-center invisible;

          width: 16px;
          height: 16px;
          background-image: url('./stories/assets/more.svg');
          background-color: #d4e4ff;
          border-radius: 2px;
          box-sizing: border-box;

          &.is-selected {
            @apply visible;
          }

          &:focus {
            outline: none;
          }
        }
      }
    }

    .tree-cascader {
      &.el-cascader {

      }
      &.el-popper {}
    }
  }
</style>
