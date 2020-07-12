<template>
  <span class="e-radio">
    <input :id="id" type="radio" v-model="groupValue$" :value="value" :disabled="disabled" class="e-radio__input">
    <a class="e-radio__frame"></a>
    <i class="e-radio__checker"></i>
  </span>
</template>

<script>
  export default {
    name: 'ERadio',

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
  }
</script>

<style lang="scss">
  .e-radio {
    @apply inline-block align-middle relative;
  }

  .e-radio__input {
    @apply absolute top-0 left-0 z-10 w-full h-full opacity-0 rounded-full cursor-pointer;

    &[disabled] {
      @apply cursor-default;
    }
  }

  .e-radio__frame {
    @apply block border rounded-full;

    width: 16px;
    height: 16px;
    border-color: #D9D9D9;

    @at-root
    .e-radio__input:not([disabled]) {
      &:hover, &:checked {
        ~ .e-radio__frame {
          @apply border-blue;
        }
      }
    }

    @at-root
    .e-radio__input[disabled] ~ & {
      background: #F5F5F5;
    }
  }

  .e-radio__checker {
    @apply rounded-full bg-blue absolute inset-0 m-auto;

    width: 8px;
    height: 8px;

    @at-root
    .e-radio__input:not(:checked) ~ & {
      @apply invisible;
    }

    @at-root
    .e-radio__input[disabled] ~ & {
      background: #D9D9D9;
    }
  }
</style>
