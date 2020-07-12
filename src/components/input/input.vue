<template>
  <el-input v-bind="$attrs"
            v-on="$listeners"
            :style="styleObj"
            class="ej-input"
            @input="observerInput">
    <slot v-for="slot in slots" :slot="slot" :name="slot"/>
  </el-input>
</template>

<script>
  import {Input as ElInput} from 'element-ui'
  import {debounce as Debounce, throttle as Throttle} from 'lodash-es'

  import {toCssSize} from '../../utils/ui'

  export default {
    name: 'EjInput',

    inheritAttrs: false,

    components: {
      ElInput,
    },

    props: {
      width: {
        type: [String, Number],
        default: 'auto',
      },

      // 防抖间隔
      debounce: {
        type: Number,
        default: 0,
      },

      // 节流间隔
      throttle: {
        type: Number,
        default: 0,
      },

      // 仅数字
      number: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      styleObj () {
        return {
          width: toCssSize(this.width),
        }
      },

      slots () {
        return Object.keys(this.$slots)
      },

      debounceFn () {
        const _this = this
        const spacingTime = this.debounce

        return Debounce(function (val) {
          _this.observerChange(val)
        }, spacingTime)
      },

      throttleFn () {
        const _this = this
        const spacingTime = this.throttle

        return Throttle(function (val) {
          _this.observerChange(val)
        }, spacingTime)
      },
    },

    created () {
      this.$listeners.input = this.observerInput

      if (this.debounce > 0 || this.throttle > 0) {
        this.$listeners.change = () => {}
      }
    },

    methods: {
      observerInput (val) {
        // 数值类型
        if (this.number && val !== '') {
          val = Number(val.replace(/[^\d]/g, ''))
        }

        this.$emit('input', val)

        this.setValue(val)
      },

      observerChange (val) {
        this.$emit('change', val)
      },

      setValue (val) {
        if (this.debounce > 0 && this.throttle > 0) {
          console.warn('仅执行“debounce”，"throttle"被忽略！')
        }

        // 防抖
        if (this.debounce > 0) {
          this.debounceFn(val)
          return
        }

        // 节流
        if (this.throttle > 0) {
          this.throttleFn(val)
        }
      },
    },
  }
</script>
