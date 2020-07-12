<template>
  <span class="ej-conditions-more">
    {{showMoreText}}
    <i :class="showMoreClass" class="el-icon-arrow-down"></i>
  </span>
</template>

<script>
  export default {
    name: 'EjSearchOptionMore',

    props: {
      showMore: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      showMoreText () {
        return this.showMore ? '收起' : '更多'
      },
      showMoreClass () {
        return this.showMore ? 'up-active' : ''
      },
    },
  }
</script>

<style lang="scss">
  @import '../variables.scss';

  .ej-conditions-more {
    @apply absolute text-blue cursor-pointer;

    top: 0;
    right: 26px;

    .el-icon-arrow-down {
      transition: transform $transition-duration;

      &.up-active {
        transform: rotateZ(180deg);
      }
    }
  }
</style>
