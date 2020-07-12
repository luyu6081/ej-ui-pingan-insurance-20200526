<template>
  <div class="custom-view">
    <div class="mx-auto w-40 text-center">
      <h3 class="demonstration">外部自定义组件：</h3>
      <el-color-picker v-model="models.color[0]" @change="colorClick(models.color[0])"/>
    </div>

    <ej-search-list ref="ejSearchList"
                    :models.sync="models"
                    :view-id="2"
                    :style="{'width': '1000px', margin: '50px auto'}"
                    @search="search">
        <template #input>
          <el-input width="552" v-model="models.keyword"/>
        </template>

        <ej-search-option-item label="内部自定义内容" :change="models.custom" :showMore="true">
          <div v-for="n in 15"
               :key="n"
               @click="customClick(n)"
               class="custom-item">
               自定义参数{{n}}
               展开收起
          </div>
        </ej-search-option-item>
    </ej-search-list>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ColorPicker as ElColorPicker, Input as ElInput} from 'element-ui'
  import {action} from '@storybook/addon-actions'

  import EjSearchOptionItem from '../../search-options/item'

  export default {
    components: {
      ElInput,
      ElColorPicker,
      EjSearchOptionItem,
    },

    data () {
      return {
        models: {
          keyword: '',
          custom: [],
          color: [],
        },
      }
    },

    methods: {
      emitSetSelected (...args) {
        return this.$refs.ejSearchList.emitSetSelected(...args)
      },

      customClick (n) {
        this.models.custom = [n]
        this.emitSetSelected({
          key: 'custom',
          label: `自定义条件：${n}`,
        })
      },

      colorClick (color) {
        this.emitSetSelected({
          key: 'color',
          label: color === null ? '' : `自定义条件：${color}`,
        })
      },

      search (...args) {
        action('search')(...args)
      },
    },

    created () {
      Vue.prototype.$apollo = {
        query () {return this},
        mutate () {return this},
        then () {return this},
        catch () {return this},
      }
    },
  }
</script>

<style lang="scss">
  .custom-view {
    .custom-item {
      margin-right: 20px;
      cursor: pointer;

      &:hover {
        @apply text-blue;
      }
    }
  }
</style>
