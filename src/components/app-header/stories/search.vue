<template>
  <div>
    <ej-app-header :user="user" @search="(...args) => action('search')(...args)">
      <template #tray>
        <ej-app-search/>
      </template>
    </ej-app-header>
  </div>
</template>

<script>
  import {action} from '@storybook/addon-actions'

  import EjAppSearch from '../../app-search'
  import {user as userData} from './mock-data'

  export default {
    components: {
      EjAppSearch,
    },

    computed: {
      action: () => action,
      user: () => userData,
    },
  }
</script>
