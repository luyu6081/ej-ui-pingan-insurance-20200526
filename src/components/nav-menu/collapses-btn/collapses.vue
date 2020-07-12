<template>
  <div :class="['collapses-toggle__btn', currentCollapse ? 'menu-expand' : 'menu-packup']" @click="handleToggle">
    <ej-icon :icon="currentCollapse ? 'menu-expand' : 'menu-packup'" class="blue-color"/>
  </div>
</template>

<script>
  import EjIcon from '../../icon'

  export default {
    name: 'CollapsesButton',

    components: {
      EjIcon,
    },

    props: {
      collapse: {
        type: Boolean,
        default: false,
      }
    },

    data () {
      return {
        currentCollapse: this.collapse,
      }
    },

    methods: {
      handleToggle () {
        this.currentCollapse = !this.currentCollapse
        this.$emit('current-collapses', this.currentCollapse)
      },
    }
  }
</script>

<style lang="scss">
  $menu-layout--blue: #0C64EB;

  .collapses-toggle__btn {
    @apply absolute cursor-pointer;

    border-radius: 4px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.2);
    top: 0;
    right: -25px;
    z-index: 2;

    .blue-color {
      color: $menu-layout--blue;
    }
  }
</style>
