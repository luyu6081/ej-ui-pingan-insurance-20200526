<template>
  <a href="javascript:" class="ej-app-search flex items-center relative" @click="active = true">
    <ej-icon icon="search"
             class="ej-app-search__button relative"
             :class="active ? ['active', 'text-gray-dark'] : undefined"
             @click="search"/>

    <transition name="ej-app-search" @after-leave="keyword = ''">
      <input type="text"
             ref="input"
             v-model="keyword"
             v-show="active"
             placeholder="全局搜索"
             class="ej-app-search__input px-4 bg-white text-black outline-none rounded-full shadow absolute right-0 my-auto"
             @keyup.enter="search"
             @blur="onInputBlur">
    </transition>
  </a>
</template>

<script>
  import EjIcon from '../icon'

  export default {
    name: 'EjAppSearch',

    components: {
      EjIcon,
    },

    data () {
      return {
        keyword: '',

        internalActive: false,
        timeout: null,
      }
    },

    computed: {
      active: {
        get () {
          return this.internalActive
        },
        set (val) {
          // 激活输入框时不需要延时
          if (val) {
            this.internalActive = val
          } else {
            this.timeout = window.setTimeout(() => {
              this.internalActive = val
            }, 200)
          }
        },
      },
    },

    watch: {
      active (val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        }
      },
      timeout (val, oldVal) {
        if (oldVal) {
          window.clearTimeout(oldVal)
        }
      },
    },

    methods: {
      onInputBlur () {
        if (!this.keyword) {
          this.active = false
        }
      },

      search () {
        if (this.active) {
          // 在已激活输入框的情况下屏蔽输入框的失焦效果
          this.timeout = null

          const keyword = this.keyword.trim()
          if (keyword) {
            this.$parent.$emit('search', keyword)
            this.active = false
          }
          // 如果用户没有输入任何关键词，维持输入框的焦点
          else {
            this.$refs.input.focus()
          }
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../app-header/variables';

  $button-scale: .8;
  $input-width: 200px;

  .ej-app-search {
    &__button {
      width: $tray-icon-size;
      height: $tray-icon-size;
      z-index: 2;
      transform: scale(1);
      transition:
        transform $animation-duration ease-out-cubic,
        color $animation-duration ease-out-cubic;

      &.active {
        transform: scale($button-scale);
      }
    }

    &__input {
      width: $input-width;
      height: 28px;
      margin-right: -6px;
      padding-right: 30px;
      z-index: 1;
    }

    /* Animations */

    $animation: #{'ej-app-search-animation'};

    &-enter-active,
    &-leave-active {
      animation: $animation-duration ease-out-cubic $animation;
    }

    &-leave-active {
      animation-direction: reverse;
    }

    @keyframes #{$animation} {
      from {
        width: 0;
        opacity: 0;
      }

      to {
        width: $input-width;
        opacity: 1;
      }
    }
  }
</style>
