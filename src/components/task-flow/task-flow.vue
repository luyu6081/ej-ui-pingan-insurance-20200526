<template>
  <div class="ej-flow-chart flex">
    <ej-flow-item v-for="(item, idx) of data"
                  :key="idx"
                  :data="item"
                  :has-next="idx < data.length - 1"
                  :class="{'flex-1': idx < data.length - 1}"
                  @nag="nag"/>
  </div>
</template>

<script>
  import FlowItem from './flow-item.vue'

  export default {
    name: 'EjTaskFlow',

    components: {
      [FlowItem.name]: FlowItem,
    },

    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },

    methods: {
      nag (data) {
        this.$emit('nag', data)
      },
    },
  }
</script>
