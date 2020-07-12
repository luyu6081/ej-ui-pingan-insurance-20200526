<template>
  <div class="story">
    <div class="story-stage">
      <ej-tabbed-workspace
        :tabs="data"
        v-model="index"
        style="width: 1000px;"
        @change-tab="change"
        @close-tab="remove">
        <template #tabbar-left>
          <span class="block px-2 py-1 leading-none bg-orange text-white rounded-full">left</span>
        </template>
        <template #tabbar-right>
          <span class="block px-2 py-1 leading-none bg-purple text-white rounded-full">right</span>
        </template>
      </ej-tabbed-workspace>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        index: 0,
        data: Array.from({length: 10}, (_, idx) => ({
          name: 'Tab ' + (idx + 1),
        })),
      }
    },

    methods: {
      remove (it, idx) {
        this.data.splice(idx, 1)
      },
      change (it, idx) {
      },
    },
  }
</script>
