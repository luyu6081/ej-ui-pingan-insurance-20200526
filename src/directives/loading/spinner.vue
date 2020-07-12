<template>
  <div class="ej-loading inset-0 z-10 flex justify-center items-center" :class="[fullscreen ? 'fixed' : 'absolute']">
    <img src="./assets/spinner.gif" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CommonLoading',

    data () {
      return {
        fullscreen: false,
      }
    },
  }
</script>

<style lang="scss">
  .ej-loading {
    background-color: rgba(255,255,255,.75);

    img {
      width: 40px;
      height: 40px;
    }
  }
</style>
