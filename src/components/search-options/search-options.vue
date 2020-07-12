<template>
  <div class="ej-search-options ej-search-conditions relative pb-5">
    <el-collapse-transition>
      <div v-show="isExpandList">
        <!-- 内容 -->
        <ej-search-tag :options="options"
                       :show-more="defaultTagMore"
                       :max-width="maxWidthTag"
                       @close="close">
          <template #prefix><slot name="tag-prefix" v-on="$listeners"/></template>
          <template #suffix><slot name="tag-suffix" v-on="$listeners"/></template>
        </ej-search-tag>
        <slot :setSelected="setSelected"/>
        <!-- 内容 -->
      </div>
    </el-collapse-transition>

    <!-- 展开收起按钮 -->
    <div class="more-line cursor-pointer" @click="isExpandList = !isExpandList">
      <el-tooltip :open-delay="150" :content="moreText" placement="bottom" popper-class="ej-search-options__tooltip">
        <i class="el-icon-arrow-down text-blue" :class="{'active': isExpandList}"/>
      </el-tooltip>
    </div>
    <!-- 展开收起按钮 -->
  </div>
</template>

<script>
  import {Tooltip as ElTooltip, CollapseTransition as ElCollapseTransition} from 'element-ui'

  import EjSearchTag from './tag/index'

  export default {
    name: 'EjSearchOptions',

    components: {
      EjSearchTag,
      ElTooltip,
      ElCollapseTransition,
    },

    provide () {
      return {
        ejSearchList: this,
      }
    },

    props: {
      // 列表默认展开收起
      defaultExpandList: Boolean,
      defaultTagMore: Boolean,
      maxWidthTag: String,
    },

    data () {
      return {
        options: {},
        isExpandList: true,
      }
    },

    computed: {
      moreText () {
        return this.isExpandList ? '收起' : '展开过滤选项'
      },
    },

    created () {
      this.isExpandList = this.defaultExpandList
    },

    methods: {
      close (key) {
        this.$children.forEach(item => {
          if (item.prop === key) {
            if (typeof item.value === 'string') {
              item.$listeners.input('')
            } else {
              item.$listeners.input([])
            }
          }
        })
        this.$delete(this.options, key)
        this.$emit('closeSelected', key)
      },

      setSelected ({key, label}) {
        if (!key) return
        if (!label) {
          this.$delete(this.options, key)
        } else {
          this.$set(this.options, key, {label})
        }
      },
    },
  }
</script>

<style lang="scss">
  .ej-search-options {
    .more-line {
      @apply flex justify-center absolute left-0 bottom-0 w-full bg-white;

      // 线条
      &::before {
        @apply absolute;

        content: '';
        width: 100%;
        height: 1px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-color: #E0E0E0;
        z-index: 1;
      }

      // 占位留白
      &::after {
        @apply absolute h-full;

        content: '';
        width: 36px; // 留白
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        z-index: 2;
      }

      .el-icon-arrow-down {
        font-size: 20px;
        z-index: 3;
        transition: transform .3s;

        &.active {
          transform: rotate(180deg)
        }
      }
    }

    &__tooltip.el-tooltip__popper.is-dark {
      @apply text-blue bg-blue-lighter py-2;

      &[x-placement^=top] .popper__arrow {
        border-top-color: theme('colors.blue.lighter');

        &::after {
          border-top-color: theme('colors.blue.lighter');
        }
      }

      &[x-placement^=bottom] .popper__arrow {
        border-bottom-color: theme('colors.blue.lighter');

        &::after {
          border-bottom-color: theme('colors.blue.lighter');
        }
      }
    }
  }
</style>
