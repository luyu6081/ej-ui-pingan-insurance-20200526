<template>
  <div>
    <ej-app-header :user="user">
      <template #tray>
        <ej-app-notification/>
      </template>
    </ej-app-header>
  </div>
</template>

<script>
  import EjAppNotification from '../../app-notification'
  import store, {Mutation} from '../../app-notification/store'
  import {notifications, messages, todos} from '../../app-notification/mock-data'
  import {user} from './mock-data'

  export default {
    store,

    components: {
      EjAppNotification,
    },

    data () {
      return {
        user,
      }
    },

    beforeCreate () {
      this.$store.commit(Mutation.setNotifications, notifications)
      this.$store.commit(Mutation.setMessages, messages)
      this.$store.commit(Mutation.setTodos, todos)
    },
  }
</script>
