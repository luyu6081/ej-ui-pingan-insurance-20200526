<template>
  <div class="ej-search-option-tag">
    <ej-search-option-item v-show="isShow" :show-more="showMore" :change="optionsMap" label="已选条件">
      <div v-for="item in optionsMap" :key="item.key" class="ej-conditions-tag">
        <el-tag :title="item.label"
                :style="style"
                closable
                @close="close(item.key)">
          {{item.label}}
        </el-tag>
      </div>
      <slot name="suffix"/>
    </ej-search-option-item>
  </div>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'

  import EjSearchOptionItem from '../item/index.vue'

  export default {
    name: 'EjSearchOptionTag',

    components: {
      ElTag,
      EjSearchOptionItem,
    },

    props: {
      showMore: Boolean,
      options: {
        type: Object,
        default: () => ({}),
      },
      maxWidth: {
        type: String,
        default: '',
      },
    },

    computed: {
      isShow () {
        return Object.keys(this.options).length !== 0
      },

      style () {
        return {
          maxWidth: this.maxWidth,
        }
      },

      optionsMap () {
        let arr = []
        for (let i in this.options) {
          arr.push(Object.assign({}, this.options[i], {key: i}))
        }
        return arr
      },
    },

    methods: {
      // sort (arr, key) {
      //   for (let i = 0; i < arr.length - 1; i++) {
      //     if (arr[i][key] > arr[i + 1][key]) {
      //       let temp = arr[i]
      //       arr[i] = arr[i + 1]
      //       arr[i + 1] = temp
      //     }
      //   }
      //   return arr
      // },

      close (key) {
        this.$emit('close', key)
      },
    },
  }
</script>

<style lang="scss">
  @import '../variables.scss';

  .ej-search-option-tag {
    .ej-conditions-tag {
      @apply relative;
      padding-top: 5px;
      max-width: 100%;

      .el-tag {
        @apply text-gray-darkest relative;

        height: $search-input-height;
        line-height: $search-input-height;
        padding-right: 2em;
        font-size: 14px;
        border: none;
        border-radius: 9px;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: theme('colors.blue.lighter');

        .el-icon-close {
          @apply absolute;

          font-size: 14px;
          line-height: 16px;
          transform: scale(0.8);
          color: #307CF1;
          right: 0.5em;
          top: 6px;

          &:hover {
            @apply text-white bg-blue-light;
          }
        }
      }
    }

    .ej-conditions-item__content {
      line-height: $search-input-height;
    }
  }
</style>
