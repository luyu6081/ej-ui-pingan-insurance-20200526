<template>
  <div class="ej-tabbed-workspace clearfix">
    <div class="tabbed-workspace-tabs">
      <span class="float-left fixed-height">
        <slot name="tabbar-left"/>
      </span>
      <span class="float-right fixed-height">
        <slot name="tabbar-right"/>
      </span>
      <ul class="clearfix">
        <li v-for="(it, idx) of tabs" :key="idx" class="float-left fixed-height">
          <el-popover
            placement="bottom"
            width="120"
            trigger="manual"
            popper-class="right-popover"
            v-model="popoverStatus[idx]">
            <div slot="reference"
                 :class="{active: idx === activeIdx}"
                 @click="changeTab(it, idx)"
                 @dblclick="rename(it, idx, $event)"
                 @contextmenu.prevent="showRight(it, idx)"
                 class="ide-tab-item flex items-center cursor-default">
              <ej-icon v-if="it.affix" icon="pin" class="icon-affix mr-2"/>
              <img v-else-if="it.icon" :src="it.icon" class="icon-left mr-2">
              <a v-show="!inputs[idx]" class="text-sm truncate name">{{it.name || '未命名'}}</a>
              <input ref="input"
                     type="text"
                     v-show="inputs[idx]"
                     v-model="item.name"
                     class="name rename text-gray-darkest"
                     :style="{width: width}"
                     @keyup.enter="renameSure"
                     @blur="renameSure">
              <span v-if="closable(it.closable)" @click.stop="closeCur(it, idx)"  class="my-icon-wrap">
                <ej-icon icon="close" class="my-icon"/>
              </span>
            </div>
            <template #default>
              <ul class="right-popover-detail text-gray-darkest">
                <li><a href="javascript:" @click="closeAll">关闭所有</a></li>
                <li><a href="javascript:" @click="closeOther(idx)" :class="{'no-event': tabs.length <= 1}">关闭其他</a></li>
                <li><a href="javascript:" @click="affixTab">{{!it.affix ? '固定' : '取消固定'}}</a></li>
              </ul>
            </template>
          </el-popover>
        </li>
        <li v-if="showCreate" @click="createTab"
            class="float-left fixed-height inline-flex items-center px-1 text-blue btn-create">
          <ej-icon icon="plus" class="icon-plus"></ej-icon>
        </li>
      </ul>
    </div>
    <div class="tabbed-workspace-content">
      <slot :tab="tabs[activeIdx]" :idx="activeIdx"/>
    </div>
  </div>
</template>

<script>
  import Lodash from 'lodash-es'
  import {MessageBox, Popover as ElPopover} from 'element-ui'

  import Icon from '../icon'

  export default {
    name: 'EjTabbedWorkspace',

    components: {
      [Icon.name]: Icon,
      ElPopover,
    },

    model: {
      prop: 'activeIdx',
      event: 'update:activeIdx',
    },

    props: {
      tabs: {
        type: Array,
        default: () => [],
      },

      activeIdx: {
        type: Number,
        default: 0,
      },

      showCreate: {
        type: Boolean,
        default: false,
      },

      renamable: {
        type: Boolean,
        default: null,
      },

      renameable: {
        type: Boolean,
        default: null,
      },

      selfClose: {
        type: Boolean,
        default: false,
      },

      rightClick: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        inputActive: -1,
        inputs: [],
        item: {},
        width: 0,
        rightClickData: {
          idx: null,
          data: {},
        },
        popoverStatus: [],
        visible: false,
      }
    },

    computed: {
      hasRename () {
        return typeof this.renamable === 'boolean' ? this.renamable : this.renameable
      },
    },

    mounted () {
      document.body.addEventListener('click', this.clearRightStatus)
    },

    destroyed () {
      document.body.removeEventListener('click', this.clearRightStatus)
    },

    methods: {
      closable (val) {
        return val === undefined ? true : val
      },

      changeTab (it, idx) {
        if (idx === this.activeIdx) return
        this.$emit('update:activeIdx', idx)
        this.$emit('change-tab', it, idx)
      },

      rename (it, idx, e) {
        if (!this.hasRename) return

        this.item = Object.assign({}, it)
        this.inputActive = idx
        this.width = `${e.currentTarget.querySelector('a').offsetWidth}px`
        this.$set(this.inputs, this.inputActive, true)
        this.$nextTick(() => {
          this.$refs.input[this.inputActive].focus()
        })
      },

      renameCancel () {
        this.$set(this.inputs, this.inputActive, false)
      },

      renameSure () {
        this.$emit('rename-tab', this.item, this.inputActive)
        this.renameCancel()
      },

      createTab () {
        this.$emit('create-tab')
      },

      showRight (it, idx) {
        /*
        * 清空其他的右键状态
        * 设置当前的右键卡片展示 */
        if (!this.rightClick) return

        this.popoverStatus = []
        this.rightClickData = {
          it,
          idx,
        }
        this.$set(this.popoverStatus, idx, true)
      },

      clearRightStatus () {
        this.popoverStatus = []
        this.rightClickData = {
          idx: null,
          data: {},
        }
      },

      closeAll () {
        this.close(Lodash.cloneDeep(this.tabs).map((it, idx) => ({
          it,
          idx,
        })))
      },

      closeOther (idx) {
        let tabs = []
        Lodash.cloneDeep(this.tabs).forEach((it, index) => {
          if (index !== idx) {
            tabs.push({
              idx,
              it,
            })
          }
        })
        this.close(tabs)
      },

      closeCur (it, idx) {
        this.close([{
          it,
          idx,
        }], 'current')
      },

      close (tabs, type) {
        if (this.selfClose) {
          this.$emit('close-tabs', tabs)
          return
        }

        MessageBox.confirm('确认关闭窗口?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$emit('close-tabs', tabs)
          if (type) {
            // 兼容上一个版本
            this.$emit('close-tab', tabs[0].it, tabs[0].idx)
          }
        })
      },

      affixTab () {
        this.$emit('affix-tab', this.rightClickData.it, this.rightClickData.idx)
      },
    },
  }
</script>

<style lang="scss">
  .ej-tabbed-workspace {
    .ide-tab-item {
      @apply bg-gray-light px-4 border border-solid border-gray relative rounded-tl rounded-tr;
      margin-right: -1px;

      &.active {
        @apply bg-white text-blue;

        z-index: 10;
      }

      .name {
        @apply py-1 border-0 text-sm;

        max-width: 300px;
        min-width: 80px;
        height: 26px;
      }

      .rename {
        &:focus {
          outline: none;
        }
      }
    }

    .my-icon-wrap {
      margin-left: 12px;
    }

    .my-icon {
      width: 8px;
      height: 8px;

      &:hover {
        color: lighten(#477de9, 20%);
      }
    }

    .icon-left {
      width: 12px;
      height: 12px;
    }

    .fixed-height {
      height: 28px;
    }

    .icon-plus {
      width: 12px;
      height: 12px;
    }

    .btn-create {
      &:hover {
        @apply text-blue-light;
      }
    }

    .icon-affix {
      width: 12px;
      height: 12px;
    }
  }
</style>
<style lang="scss">
  .right-popover {
    & {
      @apply py-1 px-2;
    }

    &-detail {
      & > * + * {
        @apply mt-1;
      }
      a {
        @apply flex items-center;
      }

      a:hover {
        @apply text-blue;
      }

      .no-event {
        @apply pointer-events-none text-gray-darker;
      }
    }
  }
</style>
