<template>
  <ej-input v-model="model"
            v-bind="$attrs"
            v-on="$listeners"
            class="ej-search-input"
            @keyup.enter.native="search">

    <slot v-for="key in slots" :slot="key" :name="key"/>

    <ej-icon slot="suffix"
             icon="search"
             class="ej-app-search__button cursor-pointer"
             @click="search"/>
  </ej-input>
</template>

<script>
  import EjIcon from '../icon'
  import EjInput from '../input/input.vue'

  export default {
    name: 'EjSearchInput',

    inheritAttrs: false,

    components: {
      EjInput,
      EjIcon,
    },

    props: {
      value: {
        type: [String, Number],
        default: '',
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

      slots () {
        return Object.keys(this.$slots)
      },
    },

    methods: {
      search () {
        const input = this.model
        this.$emit('search', input)
      },
    },
  }
</script>

<style lang="scss">
  .ej-search-input {
    & > .el-input__inner {
      border-radius: 20px;
      height: inherit;

      &:hover {
        box-shadow: 0px 1px 8px 2px rgba(140, 171, 232, 0.3);
      }

      &:focus {
        @apply border-blue;
      }
    }

    .ej-app-search__button {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);

      & + .el-input__icon {
        margin-right: 35px;
      }
    }
  }
</style>

