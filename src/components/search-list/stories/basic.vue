<template>
  <div>
    <ej-search-list ref="ejSearchList"
                    :models.sync="models"
                    :keyword.sync="models.keyword"
                    :style="{'width': '1000px', margin: '50px auto'}"
                    :default-tag-more="true"
                    :max-width-tag="maxWidthTag"
                    :default-expand-list="true"
                    :input-props="{
                      placeholder: '自定义placeholder',
                    }"
                    :view-id="1"
                    @search="search">
      <ej-search-option-list v-model="models.name" prop="name" label="机构名称" :options="searchOptions.name"/>
      <ej-search-option-cascader v-model="models.base" :clearable="true" :options="searchOptions.base" prop="base" placeholder="234" label="基础资源"/>
      <ej-search-option-select v-model="models.theme" :options="[searchOptions.theme]" prop="theme" label="主题资源"/>
      <ej-search-option-select v-model="models.filter"
                                :select-props="[
                                  {placeholder: '请选择1', disabled: true},
                                  {placeholder: '请选择2'},
                                  {placeholder: '请选择3'},
                                ]"
                                :options="[searchOptions.theme, searchOptions.theme, searchOptions.theme]"
                                prop="filter" label="过滤条件"/>
                                
      <ej-search-option-list v-model="models.format" :options="searchOptions.format" :no-multiple="true" prop="format" label="资源格式"/>
      <ej-search-option-list v-model="models.share" :options="searchOptions.share" :no-multiple="true" prop="share" label="共享状态"/>
      <ej-search-option-list v-model="models.status" :options="searchOptions.status" :no-multiple="true" prop="status" label="审核状态"/>
      <ej-search-option-radio v-model="models.radio"
                              :options="[
                                {value: '1', label: '全部'},
                                {value: '2', label: '否'},
                                {value: '3', label: '是'},
                              ]"
                              prop="radio" label="是否临时表"/>
    </ej-search-list>
  </div>
</template>

<script>
  import Vue from 'vue'
  import EjSearchOptionList from '../../search-options/list'
  import EjSearchOptionRadio from '../../search-options/radio'
  import EjSearchOptionSelect from '../../search-options/select'
  import EjSearchOptionCascader from '../../search-options/cascader'
  import SEARCH_OPTIONS from './search-options.js'

  import {list as MockList, deleted as MockDeleted} from './mock-data'
  import {number} from '@storybook/addon-knobs'
  import {action} from '@storybook/addon-actions'

  export default {
    components: {
      EjSearchOptionList,
      EjSearchOptionRadio,
      EjSearchOptionSelect,
      EjSearchOptionCascader,
    },

    data () {
      return {
        searchOptions: SEARCH_OPTIONS,

        models: {
          keyword: '',
          name: ['1', '2'],
          base: ['04', '002'],
          theme: [],
          filter: ['01'],
          format: [],
          share: [],
          status: [],
          radio: '',
          otherParam: '',
        },
      }
    },

    props: {
      maxWidthTag: {
        default: number('maxWidthTag', 100) + '%',
      },
    },

    watch: {
      'models.otherParam' (newVal) {
        if (!newVal) {
          this.emitSetSelected({
            key: 'otherParam',
            label: '',
          })
        }
      },
    },

    created () {
      Vue.prototype.$apollo = {
        query () {
          return Promise.resolve(MockList)
        },
        mutate () {
          return Promise.resolve(MockDeleted)
        },
      }
    },

    mounted () {
      setTimeout(() => {
        this.models.otherParam = 'otherParam'
        this.emitSetSelected({
          key: 'otherParam',
          label: '外部条件：otherParam超长，otherParam超长，otherParam超长，otherParam超长，otherParam超长，otherParam超长，otherParam超长，otherParam超长',
        })
      }, 800)
    },

    methods: {
      emitSetSelected (...args) {
        return this.$refs.ejSearchList.emitSetSelected(...args)
      },

      search (type, params = {}) {
        action('search')(type, Object.assign(params, {keyword: this.keyword}))
      },
    },
  }
</script>

