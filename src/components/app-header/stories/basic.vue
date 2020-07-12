<template>
  <div>
    <ej-app-header :height="height"
                   :width="width"
                   :logo="logo"
                   :title="title"
                   :user="user"
                   :fixed="fixed">
    <div class="flex-1 slot">#default</div>

      <template #tray>
        <div class="slot">#tray</div>
      </template>
    </ej-app-header>

    <ul class="text-center text-gray">
      <li v-for="n of 100" :key="n">{{n}}</li>
    </ul>
  </div>
</template>

<script>
  import {boolean, number, object, text} from '@storybook/addon-knobs'

  import {user as userData} from './mock-data'

  export default {
    props: {
      height: {
        default: number('Height', 50),
      },
      width: {
        default: number('Width', undefined),
      },
      logo: {
        default: text('Logo', require('./assets/logo.svg')),
      },
      title: {
        default: text('Title', '应用标题'),
      },
      user: {
        default: object('User', userData),
      },
      fixed: {
        default: boolean('Fixed', false),
      },
    },
  }
</script>

<style lang="scss">
  .slot {
    @apply m-2 px-4 border-2 border-dashed border-gray-dark text-gray flex items-center;
  }
</style>
