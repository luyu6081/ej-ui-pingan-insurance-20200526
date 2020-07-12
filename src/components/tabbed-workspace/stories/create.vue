<template>
  <div class="story">
    <div class="story-stage">
      <ej-tabbed-workspace v-model="index"
                           :tabs="data"
                           :show-create="true"
                           style="width: 1000px;"
                           @change-tab="change"
                           @close-tab="remove"
                           @create-tab="create">
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
      change (it, idx) {
        console.log(it, idx)
      },
      create () {
        this.data.push({
          name: '',
          closable: true,
        })
        this.index = this.data.length - 1
      },
    },
  }
</script>
