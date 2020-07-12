<template>
  <ej-input v-model="model"
            :width="width"
            :disabled="disabled"
            :clearable="clearable"
            :placeholder="placeholder"
            class="ml-8">
    <span slot="append">插入之后{{model}}</span>
    <span slot="prepend">插入之前</span>
    <i class="el-icon-edit el-input__icon" slot="suffix" />
  </ej-input>
</template>

<script>
  import {boolean, text, number} from '@storybook/addon-knobs'

  export default {
    data () {
      return {
        model: '',
      }
    },

    props: {
      disabled: {
        default: boolean('disabled', false),
      },

      clearable: {
        default: boolean('clearable', false),
      },

      placeholder: {
        default: text('placeholder', '请输入内容'),
      },

      width: {
        default: number('width', 666),
      },
    },
  }
</script>
