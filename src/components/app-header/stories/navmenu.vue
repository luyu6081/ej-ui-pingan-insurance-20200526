<template>
  <div>
    <ej-app-header :height="height"
                   :width="width"
                   :logo="logo"
                   :title="title"
                   :user="user"
                   :fixed="fixed">
      <ej-nav-menu mode="horizontal"
                   text-color="#fff"
                   active-text-color="#fff"
                   class="app-nav__menu flex">
        <el-menu-item index="_0" class="app-nav__menu-item flex items-center">
          <span>首页</span>
        </el-menu-item>

        <ej-nav-submenu index="_3"
                        :show-timeout="100"
                        class="app-nav__menu-item flex items-center">
          <template #title>更多</template>
          <el-menu-item index="_3-1">
            <span>数据地图</span>
          </el-menu-item>
          <el-menu-item index="_3-2">
            <span><a href="javascript:" target="_blank">政策法规</a></span>
          </el-menu-item>
        </ej-nav-submenu>
      </ej-nav-menu>
    </ej-app-header>

    <ul class="text-center text-gray">
      <li v-for="n of 100" :key="n">{{n}}</li>
    </ul>
  </div>
</template>

<script>
  import {boolean, number, object, text} from '@storybook/addon-knobs'
  import {MenuItem as ElMenuItem} from 'element-ui'

  import EjNavMenu from '../../nav-menu'
  import EjNavSubmenu from '../../nav-submenu'

  import {user as userData} from './mock-data'

  export default {
    components: {
      ElMenuItem,
      EjNavMenu,
      EjNavSubmenu,
    },

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
