<template>
  <el-select class="ej-select" ref="elSelect" v-bind="$attrs" v-on="$listeners">
      <el-option
        ref="elSelectOption"
        v-for="item in options"
        v-bind="item"
        :key="item.key">
        <component :is="item.component"
                   :params="item"
                   v-on="$listeners"/>
      </el-option>
  </el-select>
</template>

<script>
  import {
    Select as ElSelect,
    Option as ElOption,
  } from 'element-ui'

  export default {
    name: 'EjSelect',

    inheritAttrs: false,

    components: {
      ElSelect,
      ElOption,
    },

    props: {
      options: {
        type: Array,
        default: () => [],
      },
    },

    methods: {
      // 获取labels
      getLabels () {
        return this.$refs.elSelect.selectedLabel
      },
    },
  }
</script>
