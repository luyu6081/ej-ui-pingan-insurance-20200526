<template>
  <ej-search-option-item :show-more="defaultMore" :label="label" :change="options">
    <template v-for="(item, index) in params">
      <ej-select ref="ejSelect"
                 clearable
                 :key="index"
                 v-model="item.model"
                 v-bind="item.props"
                 :options="item.option"
                 @change="change(item.model, index)"
                 class="ej-search-option-select mr-3"/>
    </template>
    
  </ej-search-option-item>
</template>

<script>
  import EjSelect from './select'
  import EjSearchOptionItem from '../item/index'

  export default {
    name: 'EjSearchOptionSelect',

    inheritAttrs: false,

    inject: ['ejSearchList'],

    components: {
      EjSelect,
      EjSearchOptionItem,
    },

    data () {
      return {
        models: [],
      }
    },

    props: {
      defaultMore: Boolean,
      options: {
        type: Array,
        default: () => [],
      },
      prop: {
        type: String,
        default: '',
      },
      value: {
        type: Array,
        default: () => [],
      },
      label: {
        type: String,
        default: '',
      },
      selectProps: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      index () {
        return this.$parent.$children.findIndex(item => item === this)
      },

      params () {
        const options = this.options
        const models = this.models
        const selectProps = this.selectProps

        return options.map((item, index) => {
          return {model: models[index] || '', option: item, props: selectProps[index]}
        })
      },
    },

    watch: {
      value: {
        deep: true,
        immediate: true,
        handler (newVal = [], oldVal) {
          const options = this.options
          options.forEach((_, index) => {
            return this.$set(this.models, index, newVal[index] || '')
          })
          this.changeSource()
        },
      },
    },

    methods: {
      change (val, index) {
        let models = JSON.parse(JSON.stringify(this.models))
        models.splice(index, 1, val)
        this.$emit('input', models)
        this.changeSource()
      },

      changeSource () {
        this.$nextTick(_ => {
          const values = this.models
          let labels = this.$refs.ejSelect.map(item => item.getLabels()).filter(item => item)
          
          this.ejSearchList.setSelected({
            key: this.prop,
            label: labels.length ? `${this.label}：${labels.join('、')}` : '',
          })
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../variables.scss';

  .ej-search-option-select {
    width: 130px;
    line-height: $search-conditions-height;

    &:last-of-type {
      margin-right: 0;
    }

    .el-input__inner {
      height: $search-input-height;
      line-height: $search-input-height;
      font-size: 14px;
    }

    .el-input__icon {
      height: $search-input-height;
      line-height: $search-input-height;
    }
  }
</style>
