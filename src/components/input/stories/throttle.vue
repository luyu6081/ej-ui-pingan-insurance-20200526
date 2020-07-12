<template>
  <div class="w-1/2 ml-8">
    <ej-input v-model="model"
              :throttle="throttleTime"
              @change="throttleInput"/>
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
      throttleTime: {
        default: number('throttleTime', 1005),
      },
    },

    methods: {
      throttleInput (val) {
        this.ejModel = val
        action('节流')(val)
      },
    },
  }
</script>
