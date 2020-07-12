<template>
  <div class="ej-search-list">
    <div class="input-box flex justify-between items-center mb-4">
      <div class="flex flex-wrap items-end">
        <slot name="input">
          <ej-search-input v-model="keywordModel" v-bind="genInputProps" @search="search('btn')"/>
        </slot>

        <!-- 常用条件 -->
        <template v-for="(item, index) in commonlyOptions">
          <div :key="index"
               :class="{'ml-4': index === 0}"
               class="commonly-item flex cursor-pointer text-blue mt-3 mr-3"
                @click="commonlyChange(item.value, commonlyOptions)">
            {{item.label}}
            <ej-icon icon="close-circle-o" class="commonly-item-close hidden" @click.stop="deletedOptions(item.value, item.label)"/>
          </div>
        </template>
        <!-- 常用条件 -->
      </div>
      <slot name="input-suffix"/>
    </div>

    <ej-search-options ref="ejSearchOptions"
                      :max-width-tag="maxWidthTag"
                      :default-tag-more="defaultTagMore"
                      :default-expand-list="defaultExpandList"
                      @closeSelected="closeSelected">
      <template #tag-suffix>
        <ej-popover-set  @confirm="setNameConfirm" :maxlength="30">
          <p class="popover-content-text text-blue cursor-pointer">设为常用条件</p>
        </ej-popover-set>
      </template>

      <slot/>
    </ej-search-options>
  </div>
</template>

<script>
  import {Message, MessageBox as ElMessageBox} from 'element-ui'

  import EjIcon from '../icon'
  import EjSearchInput from '../search-input/search-input'
  import EjSearchOptions from '../search-options/'
  import EjPopoverSet from '../popover-set/popover-set'

  import QUERY_COMMONLY_LIST from './grapgql/query_commonly_list.gql'
  import MUTATION_COMMONLY_LIST from './grapgql/mutation_commonly_list.gql'
  import MUTATION_COMMONLY_DELETE from './grapgql/mutation_commonly_delete.gql'

  export default {
    name: 'EjSearchList',

    components: {
      EjIcon,
      EjSearchInput,
      EjSearchOptions,
      EjPopoverSet,
    },

    data () {
      return {
        commonlyOptions: [],
      }
    },

    props: {
      models: {
        type: Object,
        default: () => ({}),
      },
      keyword: {
        type: String,
        default: '',
      },
      // 列表默认展开收起
      defaultExpandList: {
        type: Boolean,
        default: true,
      },
      defaultTagMore: {
        type: Boolean,
        default: true,
      },
      maxWidthTag: {
        type: String,
        default: '',
      },
      // 应用key
      appKey: {
        type: String,
        default: '',
      },
      // 应用内页面id
      viewId: {
        type: Number,
        required: true,
      },
      // 搜索框props
      inputProps: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      keywordModel: {
        get () {
          return this.keyword
        },
        set (keyword) {
          this.$emit('update:keyword', keyword)
        },
      },

      genInputProps () {
        return Object.assign({
          width: '552px',
          clearable: true,
        }, this.inputProps)
      },
    },

    watch: {
      models: {
        deep: true,
        immediate: true,
        handler (newVal) {
          this.search('hot')
        },
      },
    },

    created () {
      if (!this.$apollo) {
        this.$apollo = {
          query () {return this},
          mutate () {return this},
          then () {return this},
          catch () {return this},
        }
      }
      this.requestCommonlyList()
    },

    methods: {
      /**
       * @param {string} type btn:搜索按钮触发  hot:数据更改触发
       */
      search (type = 'btn') {
        this.$emit('search', type, this.handlerParams(this.models))
      },

      // 获取常用条件
      requestCommonlyList () {
        const appKey = this.appKey
        const pageId = this.viewId

        this.$apollo.query({
          query: QUERY_COMMONLY_LIST,
          fetchPolicy: 'network-only',
          client: 'apolloUserClient',
          variables: {input: {appKey, pageId}},
        }).then(({data}) => {
          this.commonlyOptions = this.handlerCommonlyOptions(data.list)
        })
      },

      // 设置常用条件
      setNameConfirm (label) {
        if (!label) {
          Message.error('请输入常用条件名称！')
          return
        }

        if (this.commonlyOptions.findIndex(item => item.label === label) !== -1) {
          Message.error('该条件名称已存在！')
          return
        }

        this.$apollo.mutate({
          mutation: MUTATION_COMMONLY_LIST,
          client: 'apolloUserClient',
          variables: {
            input: {
              conditionName: label,
              conditionContent: JSON.stringify(this.models),
              pageId: this.viewId,
              appKey: this.appKey,
            },
          },
        })
        .then(({data}) => {
          if (!data || !data.result) return
          const result = data.result[0]
          const {conditionContent, conditionName, userConditionId} = result
          this.commonlyOptions.push({
            label: conditionName,
            value: userConditionId,
            params: JSON.parse(conditionContent),
          })
          Message.success('设置常用条件成功')
        }).catch((err) => {
          console.error(err)
          Message.error('设置常用条件失败')
        })
      },

      // 删除选项
      deletedOptions (id, label) {
        ElMessageBox.confirm(`确定删除“${label}”吗?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(_ => {
          this.$apollo.mutate({
            mutation: MUTATION_COMMONLY_DELETE,
            client: 'apolloUserClient',
            variables: {input: [id]},
          }).then(({data}) => {
            if (!data || !data.result) return
            const index = this.commonlyOptions.findIndex(item => item.value === id)
            if (index === -1) return
            this.commonlyOptions.splice(index, 1)
            Message.success(`删除“${label}”成功`)
          }).catch((err) => {
            console.error(err)
            Message.error(`删除“${label}”失败`)
          })
        })
      },

      // 预填通用条件
      commonlyChange (val, options = []) {
        // 获取要预填的参数
        const selected = options.find(item => item.value === val) || {params: this.clearParams(this.models)}
        this.$emit('update:models', Object.assign({}, selected.params))
      },

      // 清空参数 仅限数组和字符串
      clearParams (params) {
        let obj = {}
        for (let i in params) {
          if (Array.isArray(params[i])) {
            obj[i] = []
          } else {
            obj[i] = ''
          }
        }
        return obj
      },

      // 转换参数为键值对形式
      handlerParams (params = {}) {
        let obj = {}
        for (let i in params) {
          if (Array.isArray(params[i])) {
            obj[i] = params[i].join(',')
          } else {
            obj[i] = params[i]
          }
        }
        return obj
      },

      // 还原参数为数组形式
      // resetParams (params = {}) {
      //   const obj = {}
      //   for (let i in params) {
      //     const item = params[i]
      //     if (item) {
      //       obj[i] = item.split(',')
      //     } else {
      //       obj[i] = []
      //     }
      //   }
      //   return obj
      // },

      // 常用条件的参数
      handlerCommonlyOptions (list = []) {
        return list.map(item => {
          const {userConditionId, conditionName, conditionContent} = item
          return {
            value: userConditionId,
            label: conditionName,
            params: JSON.parse(conditionContent),
            // component: SelectTempalte,
          }
        })
      },

      // 删除已选条件
      closeSelected (key) {
        switch (typeof this.models[key]) {
          case 'string':
            this.models[key] = ''
            break
          default:
            this.models[key] = []
            break
        }

        this.$emit('close', key)
      },

      // 抛出的方法 设置已选条件
      emitSetSelected (...args) {
        return this.$refs.ejSearchOptions.setSelected(...args)
      },
    },
  }
</script>

<style lang="scss">
  @import '../search-options/variables.scss';

  .ej-search-list {
    .commonly-item {
      @apply pr-4 relative;

      &-close {
        @apply absolute top-0 right-0 w-3 h-3;
      }
    }

    .commonly-item:hover .commonly-item-close {
      @apply block;
    }

    .popover-content-text {
      margin-top: 5px;
      line-height: $search-input-height;
    }
  }
</style>

