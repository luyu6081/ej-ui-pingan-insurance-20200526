import NavMenu from './nav-menu.vue'

export default {
  ...NavMenu,
  install: Vue => Vue.component(NavMenu.name, NavMenu),
}
