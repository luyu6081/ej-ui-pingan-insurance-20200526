<template>
  <ej-search-option-item :show-more="defaultMore" :label="label" :change="options">
    <div class="ej-search-options-radio-item flex items-center">
      <el-radio v-for="item in options"
                :key="item.value"
                v-model="model"
                :label="item.value">
                {{item.label}}
      </el-radio>
    </div>
  </ej-search-option-item>
</template>

<script>
  import {Radio as ElRadio} from 'element-ui'
  import EjSearchOptionItem from '../item/index'

  export default {
    name: 'EjSearchOptionRadio',

    components: {
      ElRadio,
      EjSearchOptionItem,
    },

    inject: ['ejSearchList'],

    props: {
      defaultMore: Boolean,
      options: {
        type: Array,
        default: () => [],
      },
      prop: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '123',
      },
    },

    computed: {
      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
    },

    watch: {
      model: {
        immediate: true,
        handler () {
          this.change()
        },
      },
    },

    methods: {
      change () {
        this.$nextTick(_ => {
          const value = this.model
          const label = (this.options.find(item => item.value === value) || {}).label || ''

          this.ejSearchList.setSelected({
            key: this.prop,
            label: label.length ? `${this.label}：${label}` : '',
          })
        })
      },
    },
  }
</script>
