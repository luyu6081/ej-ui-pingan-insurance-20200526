<template>
  <div class="w-1/2 ml-8">
    <ej-input v-model.number="model" :number="true" placeholder="只能输入数字" @change="change"/>
    <br>输入内容：{{model}}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        model: '',
      }
    },

    methods: {
      change (val) {
        console.log('原生change：' + val)
      },
    },
  }
</script>
