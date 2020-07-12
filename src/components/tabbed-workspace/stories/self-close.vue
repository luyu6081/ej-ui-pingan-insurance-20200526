<template>
  <div class="story">
    <div class="story-stage">
      <ej-tabbed-workspace v-model="index"
                           :tabs="data"
                           :self-close="true"
                           :right-click="true"
                           @close-tabs="removes"
                           @affix-tab="affixTab"
                           style="width: 1000px;">
        <template #default="{tab, idx}">
          <pre>{{JSON.stringify({_index: idx, ...tab}, null, 2)}}</pre>
        </template>
      </ej-tabbed-workspace>
    </div>
  </div>
</template>

<script>
  import {logo} from '../../../assets/base64'
  import {Message} from 'element-ui'

  export default {
    data () {
      return {
        index: 1,
        data: [
          {
            name: 'tab1',
            closable: false,
            affix: true,
          },
          {
            name: 'tab2',
            icon: logo,
            affix: true,
          },
          {
            name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusantium aliquam atque.',
          },
        ],
      }
    },

    methods: {
      removes (tabs) {
        Message.info({
          message: '自定义关闭方式',
        })
      },

      affixTab (it, idx) {
        it.affix = !it.affix
        this.$set(this.data, idx, it)
      },
    },
  }
</script>
