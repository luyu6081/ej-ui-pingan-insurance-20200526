import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import {Button as ElButton} from 'element-ui'

import PopoverSet from '.'

Vue.use(ElButton)
Vue.use(PopoverSet)


storiesOf('Components|PopoverSet', module)
  .add('基本用法', () => ({
    template: `
      <div class="ml-16 mt-16">
        <div class="flex mb-5">
          <ej-popover-set clearable title="01设置"  @confirm="confirm">
            <el-button>自定义按钮</el-button>
          </ej-popover-set>

          <ej-popover-set number title="02设置" placeholder="只能输入数字" class="ml-10" @confirm="confirm">
            <div class="border p-2 cursor-pointer">自定义内容</div>
          </ej-popover-set>
        </div>
        设置内容：{{model}}
      </div>
    `,

    data () {
      return {
        model: '',
      }
    },

    methods: {
      confirm (val) {
        this.model = val
      },
    },
  }))
