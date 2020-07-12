<template>
  <div>
    <ej-app-header :user="user">
      <template #tray>
        <ej-app-setting/>
      </template>
    </ej-app-header>
  </div>
</template>

<script>
  import EjAppSetting from '../../app-setting'
  import {user} from './mock-data'

  export default {
    components: {
      EjAppSetting,
    },

    data () {
      return {
        user,
      }
    },
  }
</script>
