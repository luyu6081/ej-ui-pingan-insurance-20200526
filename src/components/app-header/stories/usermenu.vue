<template>
  <div>
    <ej-app-header :user="user">
      <template #tray>
        <ej-app-usermenu :user="user1" :endpoint="endpoint" :no-uc="noUc"/>
      </template>
    </ej-app-header>
  </div>
</template>

<script>
  import EjAppUsermenu from '../../app-usermenu'
  import {user, user1, endpoint} from './mock-data'

  export default {
    components: {
      EjAppUsermenu,
    },

    data () {
      return {
        user,
        user1,
        endpoint,
        noUc: false
      }
    },
  }
</script>
