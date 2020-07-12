<template>
  <div style="width: 800px; margin: 50px auto;">
    <ej-search-select v-model="keyword" @search="search">
      <template #prepend>
        <ej-select v-model="select.value"
                   clearable
                   :options="select.options"
                   @change="change"
                   @visible-change="visibleChange"
                   placeholder="请选择检索条件"/>
      </template>
    </ej-search-select>
  </div>
</template>

<script>
  import {action} from '@storybook/addon-actions'
  import EjSelect from '../../search-options/select/select'

  export default {
    components: {
      EjSelect,
    },

    data () {
      return {
        keyword: 'keyword',
        select: {
          value: '03',
          options: [
            {value: '01', label: '西文排版'},
            {value: '02', label: '设计中的设计'},
            {value: '03', label: '版式设计原理'},
            {value: '04', label: '色彩设计的原理'},
            {value: '06', label: '一字一生'},
          ],
        },
      }
    },

    methods: {
      search (value) {
        action('search')(value)
      },
      change (value) {
        action('change')(value)
      },
      visibleChange (value) {
        action('visible-change')(`下拉框${value ? '出现' : '隐藏'}`)
      },
    }
  }
</script>

