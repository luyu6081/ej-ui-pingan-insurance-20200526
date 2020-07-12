<template>
  <ej-search-input class="ej-search-select" v-bind="$attrs" v-on="$listeners">
    <slot name="prepend" slot="prepend"/>
  </ej-search-input>
</template>

<script>
  import EjSearchInput from '../search-input/search-input.vue'

  export default {
    name: 'EjSearchSelect',

    components: {
      EjSearchInput,
    },
  }
</script>

<style lang="scss">
  .ej-search-select {
    & > .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .el-input-group__prepend {
      @apply w-auto p-0 bg-white overflow-hidden;

      width: 145px;
      border-radius: 20px 0 0 20px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        @apply border-blue;

        & + .el-input__inner {
          border-left-color: theme('colors.blue.default')
        }
      }

      .ej-select {
        @apply block mx-0;
      }
    }
  }
</style>
