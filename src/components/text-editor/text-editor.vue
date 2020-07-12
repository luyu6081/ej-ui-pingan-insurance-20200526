<template>
  <div class="app-text-editor">
    <el-input type="textarea"
              v-model="internalValue"
              :rows="+rows"
              resize="vertical"
              :placeholder="placeholder"
              v-on="$listeners"/>
  </div>
</template>

<script>
  import {Input as ElInput} from 'element-ui'

  export default {
    name: 'EjTextEditor',

    components: {
      ElInput,
    },

    model: {
      prop: 'value',
      event: 'input',
    },

    props: {
      value: {
        type: [String, null],
      },
      placeholder: {
        type: String,
        default: 'Whatever Text Editor',
      },
      rows: {
        type: [Number, String],
        validator: val => {
          return typeof val === 'string' ? /^\d+$/.test(val) : true
        },
      },
    },

    computed: {
      internalValue: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
    },
  }
</script>
