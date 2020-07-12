<template>
  <span class="e-checkbox">
    <input ref="input"
           :id="id"
           type="checkbox"
           v-model="groupValue$"
           :value="value"
           :disabled="disabled"
           class="e-checkbox__input">
    <a class="e-checkbox__frame"></a>
    <ej-icon icon="check" class="e-checkbox__checker"/>
  </span>
</template>

<script>
  import {Icon as EjIcon} from '../..'

  export default {
    name: 'ECheckbox',

    components: {
      EjIcon,
    },

    model: {
      prop: 'groupValue',
      event: 'update:groupValue',
    },

    props: {
      id: String,

      groupValue: null,

      value: null,

      disabled: {
        type: Boolean,
        default: false,
      },

      indeterminate: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      groupValue$: {
        get () {
          return this.groupValue
        },

        set (val) {
          this.$emit('update:groupValue', val)
        },
      },
    },

    mounted () {
      this.$watch('indeterminate', {
        immediate: true,
        handler (val) {
          this.$refs.input.indeterminate = val
        },
      })
    },
  }
</script>

<style lang="scss">
  .e-checkbox {
    @apply inline-block relative align-middle;
  }

  .e-checkbox__input {
    @apply absolute top-0 left-0 z-10 w-full h-full opacity-0 cursor-pointer;

    border-radius: 2px;

    &[disabled] {
      @apply cursor-default;
    }
  }

  .e-checkbox__frame {
    @apply block border relative;

    width: 16px;
    height: 16px;
    border-radius: 2px;
    border-color: #D9D9D9;

    @at-root
    .e-checkbox__input:not([disabled]) {
      &:hover, &:checked {
        ~ .e-checkbox__frame {
          @apply border-blue;
        }
      }
    }

    @at-root
    .e-checkbox__input:checked ~ & {
      @apply bg-blue;
    }

    @at-root
    .e-checkbox__input[disabled] ~ & {
      background: #F5F5F5;
    }

    @at-root
    .e-checkbox__input:indeterminate ~ &::after {
      @apply block bg-blue absolute inset-0 m-auto;

      content: '';
      width: 8px;
      height: 8px;
    }
  }

  .e-checkbox__checker {
    @apply text-white absolute inset-0 m-auto;

    width: 10px;
    height: 10px;

    @at-root
    .e-checkbox__input:not(:checked) ~ & {
      @apply invisible;
    }

    @at-root
    .e-checkbox__input[disabled] ~ & {
      color: #BFBFBF;
    }
  }
</style>
