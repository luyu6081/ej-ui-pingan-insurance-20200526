<template>
  <div class="story">
    <div class="story-stage">
      <ej-tabbed-workspace v-model="index"
                           :tabs="data"
                           :renamable="true"
                           style="width: 1000px;"
                           @change-tab="change"
                           @rename-tab="rename"
                           @close-tab="remove">
        <template #default="{tab, idx}">
          <pre>{{JSON.stringify({_index: idx, ...tab}, null, 2)}}</pre>
        </template>
      </ej-tabbed-workspace>
    </div>
  </div>
</template>

<script>
  import {logo} from '../../../assets/base64'

  export default {
    data () {
      return {
        index: 1,
        data: [
          {
            name: 'tab1',
            icon: logo,
            closable: false,
          },
          {
            name: 'tab2',
          },
          {
            name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusantium aliquam atque.',
          },
        ],
      }
    },

    methods: {
      remove (it, idx) {
        this.data.splice(idx, 1)
      },
      rename (it, idx) {
        this.$set(this.data, idx, it)
      },
      change (it, idx) {
        console.log(it, idx)
      },
    },
  }
</script>
