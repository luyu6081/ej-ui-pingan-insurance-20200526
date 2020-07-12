<template>
  <div class="ej-tree-contextmenu">
    <ul class="ej-tree-contextmenu__list">
      <li >
        <div :class="['ej-tree-contextmenu__item', {'is-selected': isSelected}, {'is-disabled': menu.disabled}]"
             @click.stop="menuClick(menu)">
          <!-- 非叶子节点 -->
          <ej-tree-contextmenu-item v-if="!isLeaf" :menu="menu" :commands="commands" :level="level">
            <div class="ej-tree-contextmenu__children">
              <ej-tree-contextmenu v-for="(item, index) in menu.children"
                                  :key="index"
                                  :menu="item"
                                  :level="level + 1"
                                  :commands="commands"
                                  :commandTrigger="commandTrigger"
                                  @change="onChange"
                                  @commandTriggerChange="onCommandTriggerChange"></ej-tree-contextmenu>
            </div>
          </ej-tree-contextmenu-item>

          <!-- 叶子节点 -->
          <el-dropdown-item v-else :disabled="menu.disabled">
            <ej-tree-contextmenu-item :menu="menu" :commands="commands" :level="level">
              <div class="ej-tree-contextmenu__children">
                <ej-tree-contextmenu v-for="(item, index) in menu.children"
                                    :key="index"
                                    :menu="item"
                                    :level="level + 1"
                                    :commands="commands"
                                    :commandTrigger="commandTrigger"
                                    @change="onChange"
                                    @commandTriggerChange="onCommandTriggerChange"
                                    class="ej-tree-contextmenu__children"></ej-tree-contextmenu>
              </div>
            </ej-tree-contextmenu-item>
          </el-dropdown-item>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    DropdownItem as ElDropdownItem,
  } from 'element-ui'

  import EjTreeContextmenuItem from './contextmenu-item'

  export default {
    name: 'EjTreeContextmenu',
    components: {
      ElDropdownItem,
      EjTreeContextmenuItem,
    },
    props: {
      menu: {
        type: Object,
        default: () => ({}),
      },
      commands: {
        type: Array,
        default: () => [],
      },
      commandTrigger: {
        type: Number,
        default: 0,
      },
      command: {
        type: Array,
        default: () => [],
      },
      level: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      isSelected () {
        const commands = this.commands || []
        return commands[this.level] === this.menu.command
      },
      isLeaf () {
        return !this.menu.children || !this.menu.children.length
      },
    },
    data () {
      return {
        selectedMenu: [],
      }
    },
    methods: {
      onChange (params) {
        this.$emit('change', params)
      },
      onCommandTriggerChange () {
        this.$emit('commandTriggerChange', this.commandTrigger + 1)
      },
      menuClick (menu) {
        this.onChange({index: this.level, command: menu.command})
        if (this.isLeaf) {
          this.$emit('commandTriggerChange', this.commandTrigger + 1)
        }
      },
      observableMenu (item) {
        if (item.disabled === undefined) {
          this.$set(item, 'disabled', false)
        }
      },
    },
    mounted () {
      this.observableMenu(this.menu)
    },
  }
</script>

<style lang="scss">
  .ej-tree-contextmenu {
    @apply relative bg-white;

    &__list {
      @apply list-none;
    }

    &__item {
      @apply text-blue cursor-pointer relative;

      font-size: 14px;
      line-height: 22px;
      white-space: nowrap;

      &:focus,
      &:not(.is-disabled),
      & > .el-dropdown-menu__item:focus,
      & > .el-dropdown-menu__item:not(.is-disabled) {

        &:hover {
          @apply text-gray-darkest;

          background-color: #edf2fd;
        }
      }

      &.is-selected {
        @apply text-gray-darkest;

        background-color: #ecf2fc !important;
      }

      &.is-disabled {
        @apply text-gray-dark cursor-default;
      }

      & > div,
      & > .el-dropdown-menu__item > div {
        padding: 2px 8px;
      }

      & > div > .ej-tree-contextmenu__children {
        @apply absolute top-0;

        left: calc(100% + 2px);
        top: -10px;
        padding: 10px 0;
        box-sizing: border-box;
        background-color: #FFF;
        border: 1px solid #EBEEF5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      & > .el-dropdown-menu__item {
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 22px;

        &.is-disabled {
          @apply text-gray-dark;
        }
      }
    }
  }
</style>
