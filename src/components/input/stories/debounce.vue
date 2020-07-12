<template>
  <div class="w-1/2 ml-8">
    <ej-input v-model="model"
              :debounce="debounceTime"
              @change="debounceInput"/>
    <br>输入内容：{{ejModel}}
  </div>
</template>

<script>
  import {action} from '@storybook/addon-actions'
  import {boolean, number} from '@storybook/addon-knobs'

  export default {
    data () {
      return {
        model: '',
        ejModel: '',
      }
    },

    props: {
      debounceTime: {
        default: number('debounceTime', 1005),
      },
    },

    methods: {
      debounceInput (val) {
        this.ejModel = val
        action('防抖')(val)
      },
    },
  }
</script>
