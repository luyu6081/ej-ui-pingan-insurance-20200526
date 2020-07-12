<template>
  <div>
    <span>{{ menu.label }}</span>
    <span v-if="menu.children" class="el-icon-arrow-right"></span>
    <!-- 循环 -->
    <template v-if="menu.children && isSelected">
      <slot></slot>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'EjTreeContextmenuItem',
    props: {
      menu: {
        type: Object,
        default: () => ({}),
      },
      commands: {
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
  }
</script>
