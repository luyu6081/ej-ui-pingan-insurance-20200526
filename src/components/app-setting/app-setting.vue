<template>
  <a href="javascript:" class="ej-app-setting flex items-center" @click="goSettings">
    <ej-icon icon="gear" class="ej-app-setting__button"/>
  </a>
</template>

<script>
  import EjIcon from '../icon'

  export default {
    name: 'EjAppSetting',

    components: {
      EjIcon,
    },

    methods: {
      goSettings () {
        if (this.$router) {
          this.$router.push({name: 'app-settings'})
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../app-header/variables';

  .ej-app-setting {
    &__button {
      width: $tray-icon-size;
      height: $tray-icon-size;
    }
  }
</style>
