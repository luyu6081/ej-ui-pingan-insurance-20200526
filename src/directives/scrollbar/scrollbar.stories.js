import {storiesOf} from '@storybook/vue'
import {boolean} from '@storybook/addon-knobs'
import Vue from 'vue'

import Scrollbar from './index'

Vue.use(Scrollbar)

storiesOf('Directives|Scrollbar', module)
  .add('局部模式', () => ({
    template: `
      <div class="border border-black overflow-hidden relative" style="height: 200px; width: 300px">
        <div v-ej-scrollbar:options="{minScrollbarLength: 10, swipeEasing: false}" @ps-scroll-y="handlePsScrollY" class="border border-black overflow-hidden relative" style="height: 200px; width: 300px">
          <ul>
            <li v-for="(item, index) of 20">这是一行这是一行这是一行这是一行这是一行这是一行这是一行这是一行这是一行这是一行这是一行</li>
          </ul>
        </div>
      </div>
    `,
    props: {
      loading: {
        default: boolean('Loading', true),
      },
    },

    methods: {
      handlePsScrollY(e) {
        console.log("handlePsScrollY", e)
      },
    },
  }))
