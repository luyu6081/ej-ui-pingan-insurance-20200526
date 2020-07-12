<template>
  <ej-search-option-item :show-more="defaultMore" :label="label" :change="options">
    <div v-for="item in options"
         :key="item.value"
         class="ej-conditions-list"
         :class="{'text-blue': someSelected(selectedList, item.value)}"
         @click="click(item.value)">
      {{item.label}}
      <span v-if="item.num" class="text-black">
        (<em class="text-red not-italic">{{item.num}}</em>)
      </span>
    </div>
  </ej-search-option-item>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'
  import EjSearchOptionItem from '../item/index'
  import {mapListString} from '../../../utils'

  export default {
    name: 'EjSearchOptionList',

    components: {
      ElTag,
      EjSearchOptionItem,
    },

    inject: ['ejSearchList'],

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
      noMultiple: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      selectedList () {
        return this.value.map(item => {
          return this.options.filter(citem => {
            return item === citem.value
          })[0]
        })
      },
    },

    watch: {
      selectedList: {
        immediate: true,
        handler () {
          this.emitLables()
        },
      },
    },

    methods: {
      click (key) {
        let value = this.value
        if (this.someSelected(this.selectedList, key)) {
          value.splice(value.indexOf(key), 1)
        } else {
          // 单选/多选
          if (this.noMultiple) {
            value = [key]
          } else {
            value.push(key)
          }
        }
        // 修改v-model值
        this.$emit('input', value)
      },

      someSelected (list, key) {
        return list.some(item => {
          return item && item.value === key
        })
      },

      emitLables () {
        this.ejSearchList.setSelected({
          key: this.prop,
          label: this.selectedList.length ? `${this.label}：${mapListString(this.selectedList, 'label', '、')}` : '',
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../variables.scss';

  .ej-conditions-list {
    @apply cursor-pointer whitespace-no-wrap float-left;

    margin-right: 30px;
  }
</style>
