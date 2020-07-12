<template>
  <div class="ej-conditions-item">
    <span class="title">{{label}}</span>
    <div ref="listWrapper"
         class="ej-conditions-item__content"
         :class="{'max-height-300': isMore}">
      <div class="flex flex-wrap max-w-full overflow-hidden" ref="listContent">
        <slot/>
      </div>

      <ej-search-option-more v-show="isMoreBtn" :show-more="isMore" @click.native="moreClick"/>
    </div>
  </div>
</template>

<script>
  import EjSearchOptionMore from '../more/index'

  export default {
    name: 'EjSearchOptionItem',

    components: {
      EjSearchOptionMore,
    },

    inject: ['ejSearchList'],

    props: {
      label: {
        type: String,
        default: '',
      },
      change: {
        type: [Array, String, Number],
        default: () => [],
      },
      showMore: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        isMoreBtn: false,
        isMore: false,
      }
    },

    watch: {
      // 更新数据时重新计算
      change: {
        deep: true,
        immediate: true,
        handler () {
          this.showMoreBtn()
        },
      },

      // 展开收起列表 展开时重新计算
      'ejSearchList.isExpandList' (newVal) {
        if (newVal) {
          this.showMoreBtn()
        }
      },
    },

    created () {
      this.isMore = this.showMore
    },

    mounted () {
      this.showMoreBtn()
    },

    methods: {
      showMoreBtn () {
        this.$nextTick(() => {
          // 减掉80的右内边距
          const listWrapper = this.$refs.listWrapper.offsetWidth - 80
          const listContent = this.$refs.listContent.offsetWidth

          // 判断长度超过父级
          this.isMoreBtn = listContent >= listWrapper
        })
      },

      moreClick () {
        this.isMore = !this.isMore
      },
    },
  }
</script>

<style lang="scss">
  @import '../variables.scss';

  .ej-conditions-item {
    @apply flex;

    &:last-child {
      margin-bottom: 0;
    }

    .title {
      @apply text-gray-darkest font-bold whitespace-no-wrap;

      height: $search-conditions-height;
      line-height: $search-conditions-height;
      margin-right: 20px;
    }

    &__content {
      @apply flex relative overflow-hidden;

      width: 100%;
      padding-right: 80px;
      max-height: $search-conditions-height;
      line-height: $search-conditions-height;
      transition: max-height $transition-duration;

      &.max-height-300 {
        max-height: 300px !important;
      }
    }
  }
</style>
