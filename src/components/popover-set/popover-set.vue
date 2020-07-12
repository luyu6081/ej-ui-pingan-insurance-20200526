<template>
  <el-popover
    v-model="visible"
    trigger="click"
    class="set-name-view"
    popper-class="set-name-popper">
    <h3>{{title}}</h3>

    <ej-input v-model.trim="model"
              :number="number"
              :clearable="clearable"
              :placeholder="placeholder"
              :maxlength="maxlength"
              class="mt-1"
              @keyup.enter.native="confirm(model)"/>

    <div class="text-center mt-2">
      <el-button size="small" @click="close()">取消</el-button>
      <el-button type="primary" @click="confirm(model)" size="small">确定</el-button>
    </div>

    <slot name="default" slot="reference"/>
  </el-popover>
</template>

<script>
  import {Button as ElButton, Popover as ElPopover} from 'element-ui'
  import EjInput from '../input/input.vue'

  export default {
    name: 'EjPopoverSet',

    components: {
      EjInput,
      ElButton,
      ElPopover,
    },

    props: {
      defaultValue: {
        type: [String, Number],
        default: '',
      },

      title: {
        type: String,
        default: '新常用条件名称',
      },

      number: Boolean,
      clearable: Boolean,
      placeholder: String,
      maxlength: Number,
    },

    data () {
      return {
        visible: false,
        model: '',
      }
    },

    watch: {
      visible (newVal) {
        if (newVal) this.model = this.defaultValue
      },
    },

    methods: {
      close () {
        this.visible = false
      },

      confirm (val) {
        this.$emit('confirm', val)
        this.close()
      },
    },
  }
</script>


<style lang="scss">
  @import '../search-options/variables.scss';
  .set-name-popper {
    .el-input {
      .el-input__inner {
        height: $search-input-height;
        line-height: $search-input-height;
      }

      .el-input__icon {
        line-height: $search-input-height;
      }
    }
  }
</style>

